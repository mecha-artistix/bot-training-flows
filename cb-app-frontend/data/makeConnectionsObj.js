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

// const list = new LinkedNodes();
// const startNodeData = nodes.find((n) => n.id === 'start_node');
// list.append(startNode, startNode.id);

export function makeConnectionsObj(objPrint, nodes, edges) {
  const startNode = nodes.find((n) => n.id === 'start_node');
  objPrint.append(startNode, startNode.id);
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];

    if (!objPrint.findNode(node.id)) {
      objPrint.append(node);
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
      objPrint.append(nextNode, node.id, nextBranch);
    }
  }
}
// makeConnectionsObj(list, nodes, edges);
// console.log(JSON.stringify(list));
// const connectedList = JSON.stringify(list.getTree(), null, 2);

// console.log(connectedList);
