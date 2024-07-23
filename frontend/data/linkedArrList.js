import { initEdges, edges } from './initialEdges.js';
import { initNodes, nodes } from './initialNodes.js';

class Node {
  constructor(data) {
    this.id = data.id;
    this.data = data.data;
    this.intention = data.intention;
    this.response = data.response || {};
    this.positive = [];
    this.negative = [];
    this.neutral = [];
    this.parents = []; // To keep track of nodes that connect to this node
  }
  setResponse(response) {
    this.response = response;
  }
}

export class LinkedNodes {
  constructor() {
    this.nodes = {}; // Use a map for quick lookup
  }

  findNode(id) {
    return this.nodes[id] || null;
  }

  append(data, parentId = null, branch = null) {
    if (!this.nodes[data.id]) {
      this.nodes[data.id] = new Node(data);
    }
    const node = this.nodes[data.id];

    if (parentId && branch) {
      if (!this.nodes[parentId]) {
        throw new Error(`Parent node with id ${parentId} does not exist`);
      }
      const parentNode = this.nodes[parentId];
      parentNode[branch].push(node);
      node.parents.push({ parentId, branch });
    }
  }

  getTree() {
    // Return a nested structure of the tree from all nodes
    const buildTree = (node) => {
      return {
        id: node.id,
        data: node.data,
        response: node.response,
        intention: node.intention,
        positive: node.positive.map(buildTree),
        negative: node.negative.map(buildTree),
        neutral: node.neutral.map(buildTree),
      };
    };

    const roots = Object.values(this.nodes).filter((node) => node.parents.length === 0);
    return roots.map(buildTree);
  }
}

const list = new LinkedNodes();

// export function makeConnectionsObj(nodes, edges) {
function makeConnectionsObj(nodes, edges) {
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];

    if (!list.findNode(node.id)) {
      list.append(node);
    }

    const connections = edges.filter((edg) => edg.source === node.id);
    for (let e = 0; e < connections.length; e++) {
      const edg = connections[e];
      const nextNode = nodes.find((n) => n.id === edg.target);
      nextNode.response = edg.data || nextNode.response;
      nextNode.intention = '';

      let nextBranch = '';
      switch (edg.sourceHandle) {
        case 'r':
          nextBranch = 'negative';
          break;
        case 'g':
          nextBranch = 'positive';
          break;
        default:
          nextBranch = 'neutral';
      }
      nextNode.intention = nextBranch;
      list.append(nextNode, node.id, nextBranch);
    }
  }
}

// makeConnectionsObj(initNodes, initEdges);
makeConnectionsObj(nodes, edges);

// console.log(connectedList);

/// GENERATE MODEL

const enqueueChildren = (queue, children, parent) => {
  children.forEach((child) => {
    queue.push({ node: child, parent: parent });
  });
};

// let modelPrompt = '';

const generateModel = (heads) => {
  let modelPrompt = '';
  if (!heads || heads.length === 0) return;
  let queue = heads.map((head) => ({ node: head, parent: null }));

  while (queue.length > 0) {
    let { node: current, parent } = queue.shift();

    let parentId = parent && parent.id ? parent.id : '';
    let parentResLabel = parent && parent.data && parent.data.texts ? parent.data.texts.join(', ') : '';

    // Collect response labels and texts
    let responseLabel = current.response && current.response.label ? current.response.label : '';
    let responseTexts = current.response && current.response.inputs ? current.response.inputs.join(', ') : '';
    let botText = current.data && current.data.texts ? current.data.texts.join(', ') : '';

    // Add the collected texts to modelPrompt
    modelPrompt += responseLabel.length > 0 ? `Response to --> ${parentId}\n > ${responseLabel}\n` : '\n';
    modelPrompt += responseTexts.length > 0 ? `Response Examples --> ${responseTexts}\n` : '\n';
    modelPrompt += botText.length > 0 ? `Bot Response --> ${botText}\n\n\n\n` : '\n';

    // Enqueue children nodes
    if (current.positive && current.positive.length > 0) enqueueChildren(queue, current.positive, current);
    if (current.negative && current.negative.length > 0) enqueueChildren(queue, current.negative, current);
    if (current.neutral && current.neutral.length > 0) enqueueChildren(queue, current.neutral, current);
  }

  return modelPrompt;
};

const connectedList = list.getTree();
// const prompt = generateModel(connectedList);

// const listtree = JSON.stringify(list.getTree(), null, 2);
console.log(generateModel(connectedList));
// console.log(listtree);

//   list.append(startNode);

// class Node {
//   constructor(data) {
//     this.id = data.id;
//     this.data = data.data;
//     this.intention = data.intention;
//     this.response = data.response || {};
//     this.positive = [];
//     this.negative = [];
//     this.neutral = [];
//   }
//   setResponse(response) {
//     this.response = response;
//   }
// }

// export class LinkedNodes {
//   constructor() {
//     this.head = null;
//     this.length = 0;
//   }

//   findNode(id) {
//     const findId = (node) => {
//       if (!node) return null;
//       if (node.id === id) return node;
//       let found = null;
//       for (const branch of ["positive", "negative", "neutral"]) {
//         node[branch].some((child) => {
//           found = findId(child);
//           return found;
//         });
//         if (found) return found;
//       }
//       return null;
//     };
//     return findId(this.head);
//   }

//   append(data, parentId = null, branch = null) {
//     const node = new Node(data);

//     if (parentId) {
//       const parentNode = this.findNode(parentId);
//       if (parentNode && branch) {
//         parentNode[branch].push(node);
//       }
//     } else {
//       this.head = node;
//     }

//     this.length++;
//   }

//   getTree() {
//     const buildTree = (node) => {
//       if (!node) return null;
//       return {
//         id: node.id,
//         data: node.data,
//         response: node.response,
//         intention: node.intention,
//         positive: node.positive.map(buildTree),
//         negative: node.negative.map(buildTree),
//         neutral: node.neutral.map(buildTree),
//       };
//     };

//     return buildTree(this.head);
//   }
// }

// export function makeConnectionsObj(objPrint, nodes, edges) {
//   for (let n = 0; n < nodes.length; n++) {
//     const node = nodes[n];

//     if (!objPrint.findNode(node.id)) {
//       objPrint.append(node);
//     }

//     const connections = edges.filter((edg) => edg.source == node.id);
//     for (let e = 0; e < connections.length; e++) {
//       const edg = connections[e];
//       const nextNode = nodes.find((n) => n.id == edg.target);
//       nextNode.response = edg.data || nextNode.response;
//       nextNode.intention = "";

//       let nextBranch = "";
//       switch (edg.sourceHandle) {
//         case "r":
//           nextBranch = "negative";
//           break;
//         case "g":
//           nextBranch = "positive";
//           break;
//         default:
//           nextBranch = "neutral";
//       }
//       nextNode.intention = nextBranch;
//       objPrint.append(nextNode, node.id, nextBranch);
//     }
//   }
// }
