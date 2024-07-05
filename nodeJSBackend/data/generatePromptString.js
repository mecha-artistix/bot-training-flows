const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserProfile = require('../userProfile/UserProfileModel');
const Flowchart = require('../flowcharts/flowchartModel');

dotenv.config({ path: './.env' });

const mongoUrl = process.env.DB_MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// getUserProfile(userID);

const userID = '667e8d470d16951275ebae90';

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

class LinkedNodes {
  constructor() {
    this.nodes = {}; // Use a map for quick lookup
  }

  findNode(id) {
    // Helper function to search an array of nodes
    const findInArray = (array) => {
      for (const node of array) {
        const found = findId(node);
        if (found) return found;
      }
      return null;
    };

    // Main recursive search function
    const findId = (node) => {
      if (!node) return null;
      if (node.id === id) return node;
      return (
        (node.positive.length > 0 && findInArray(node.positive)) ||
        (node.negative.length > 0 && findInArray(node.negative)) ||
        (node.neutral.length > 0 && findInArray(node.neutral))
      );
    };

    // Start the search from the head node
    return findId(this.head);
  }

  append(data, parentId = null, branch = null) {
    if (!this.nodes[data.id]) {
      this.nodes[data.id] = new Node(data);
      this.length++;
    }
    const node = this.nodes[data.id];

    if (parentId && branch) {
      if (!this.nodes[parentId]) {
        throw new Error(`Parent node with id ${parentId} does not exist`);
      }
      const parentNode = this.nodes[parentId];
      parentNode[branch].push(node);
      node.parents.push(parentId);

      // console.log(`Appended node ${node.id} to ${parentNode.id} on ${branch} branch`);
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

// const list = new LinkedNodes(initNodes, initEdges);
// const JsonList = JSON.stringify(list.getTree(), null);
// console.log(JsonList);
// console.log(list.modelPrompt);

function makeConnectionsObj(list, nodes, edges) {
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

const enqueueChildren = (queue, children, parent) => {
  children.forEach((child) => {
    queue.push({ node: child, parent: parent });
  });
};

const generateModel = (heads) => {
  let modelPrompt = '';
  if (!heads || heads.length === 0) return;
  let queue = heads.map((head) => ({ node: head, parent: null }));

  while (queue.length > 0) {
    let { node: current, parent } = queue.shift();

    let parentId = parent && parent.id ? parent.id : '';
    let parentResLabel = parent && parent.data && parent.data.texts ? parent.data.texts.join(', ') : '';

    // Collect response labels and texts
    let intention = current.intention ? current.intention : '';
    let responseLabel = current.response && current.response.label ? current.response.label : '';
    let responseTexts = current.response && current.response.inputs ? current.response.inputs.join(', ') : '';
    let botText = current.data && current.data.texts ? current.data.texts.join(', ') : '';
    let botId = current.id ? current.id : '';

    // console.log(parentId, intention, responseTexts, botText, botId);
    // Add the collected texts to modelPrompt
    modelPrompt +=
      (responseLabel.length > 0 ? `IF Respond ${intention}ly to ${parentId} for example ${responseLabel}\n` : '\n') +
      (responseTexts.length > 0 ? `Other Examples --> ${responseTexts}\n` : '\n') +
      (botText.length > 0 ? `Then\n${botId} --> ${botText}\n` : '\n\n');

    // Enqueue children nodes
    if (current.positive && current.positive.length > 0) enqueueChildren(queue, current.positive, current);
    if (current.negative && current.negative.length > 0) enqueueChildren(queue, current.negative, current);
    if (current.neutral && current.neutral.length > 0) enqueueChildren(queue, current.neutral, current);
  }
  // console.log(modelPrompt);
  return modelPrompt;
};

async function fetchFlowchartData() {
  try {
    const flowcharts = await Flowchart.find({ user: userID, name: 'test' });
    const nodes = flowcharts[0].nodes;
    const edges = flowcharts[0].edges;
    // console.log(nodes, edges);
    // return { nodes: flowcharts[0].nodes, edges: flowcharts[0].edges };
    const list = new LinkedNodes();
    makeConnectionsObj(list, nodes, edges);
    const connectedList = list.getTree();
    // console.log(connectedList);
    const prompt = generateModel(connectedList);
    console.log(prompt);
  } catch (err) {
    console.error('Failed to fetch flowchart:', err);
    throw err; // Propagate the error if needed
  }
}
fetchFlowchartData();

// async function getUserProfile(userID) {
//   try {
//     const userProfile = await UserProfile.find({ user: userID });
//     console.log(userProfile);
//   } catch (err) {
//     console.log(err);
//   }
// }
// let nodes = [];
// let edges = [];

// (async () => {
//   try {
//     const flowcharts = await fetchFlowchartData();
//     nodes = [...flowcharts[0].nodes];
//     edges = [...flowcharts[0].edges];
//     console.log(nodes, edges);
//   } catch (err) {
//     console.log(err);
//   }
// })();
// console.log(nodes, edges);
// async function getFlowchart() {
//   try {
//     const flowcharts = await Flowchart.find({ user: userID, name: 'zzz' });
//     nodes = await [...flowcharts[0].nodes];
//     edges = await [...flowcharts[0].edges];
//     // { nodes, edges } = {flowcharts[0]};
//     // const flowchart = { nodes, edges };
//     // console.log(flowcharts[0]);
//     return flowcharts[0];

//     // console.log(flowchart);
//   } catch (err) {
//     console.log(err);
//   }
// }
// await getFlowchart();

/*

function generateModel(heads) {
  this.modelPrompt = '';
  const tree = this.getTree();
  console.log(tree);
  if (!tree) return;

  let queue = [{ node: tree, parent: null }];

  while (queue.length > 0) {
    let { node: current, parent } = queue.shift();
    let parentId = parent && parent.id ? parent.id : '';
    let parentResLabel = parent && parent.data && parent.data.texts ? parent.data.texts.join(', ') : '';

    // Collect response labels and texts
    let intention = current.intention ? current.intention : '';
    let responseLabel = current.response && current.response.label ? current.response.label : '';
    let responseTexts = current.response && current.response.inputs ? current.response.inputs.join(', ') : '';
    let botText = current.data && current.data.texts ? current.data.texts.join(', ') : '';
    let botId = current.id ? current.id : '';
    // Add the collected texts to modelPrompt
    this.modelPrompt +=
      (responseLabel.length > 0 ? `IF Respond ${intention}ly to ${parentId} for example ${responseLabel}\n` : '\n') +
      (responseTexts.length > 0 ? `Other Examples --> ${responseTexts}\n` : '\n') +
      (botText.length > 0 ? `Then\n${botId} --> ${botText}\n` : '\n\n');

    // this.modelPrompt += responseLabel.length > 0 ? `Response to --> ${parentId}\n > ${responseLabel}\n` : '\n';
    // this.modelPrompt += responseTexts.length > 0 ? `Response Examples --> ${responseTexts}\n` : '\n';
    // this.modelPrompt += botText.length > 0 ? `Bot Response --> ${botText}\n\n\n\n` : '\n';

    // Enqueue children nodes
    if (current.positive && current.positive.length > 0) this.enqueueChildren(queue, current.positive, current);
    if (current.negative && current.negative.length > 0) this.enqueueChildren(queue, current.negative, current);
    if (current.neutral && current.neutral.length > 0) this.enqueueChildren(queue, current.neutral, current);
  }
  // console.log(this.modelPrompt);
  return this.modelPrompt;
}

*/
