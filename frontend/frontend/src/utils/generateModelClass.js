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
  constructor(nds, eds) {
    const startNodeData = nds.find((n) => n.id === "start_node");
    if (!startNodeData) {
      throw new Error("Start node not found.");
    }
    this.head = new Node(startNodeData);
    this.nodes = { [this.head.id]: this.head };
    this.length = 1; // Start with head node

    // Initialize nodes map
    nds.forEach((nodeData) => {
      if (!this.nodes[nodeData.id]) {
        this.nodes[nodeData.id] = new Node(nodeData);
      }
    });

    this.nds = nds;
    this.eds = eds;
    this.prompt = "";

    // Build connections
    this.makeConnectionsObj();
    this.generateModel();
  }

  getTree() {
    const buildTree = (node) => {
      if (!node) return null;

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
    return this.head ? buildTree(this.head) : null;
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
    }
  }

  makeConnectionsObj() {
    for (let n = 0; n < this.nds.length; n++) {
      const node = this.nds[n];

      if (!this.findNode(node.id)) {
        this.append(node);
      }

      const connections = this.eds.filter((edg) => edg.source === node.id);
      for (let e = 0; e < connections.length; e++) {
        const edg = connections[e];
        const nextNode = this.nds.find((n) => n.id === edg.target);
        nextNode.response = edg.data || nextNode.response;
        nextNode.intention = "";

        let nextBranch = "";
        switch (edg.sourceHandle) {
          case "r":
            nextBranch = "negative";
            break;
          case "g":
            nextBranch = "positive";
            break;
          default:
            nextBranch = "neutral";
        }
        nextNode.intention = nextBranch;
        this.append(nextNode, node.id, nextBranch);
      }
    }
  }

  enqueueChildren(queue, children, parent) {
    children.forEach((child) => {
      queue.push({ node: child, parent: parent });
    });
  }

  generateModel() {
    this.modelPrompt = "";
    const tree = this.getTree();
    if (!tree) return;
    // console.log(tree);

    let queue = [{ node: tree, parent: null }];

    while (queue.length > 0) {
      let { node: current, parent } = queue.shift();

      let parentId = parent && parent.id ? parent.id : "";
      let parentResLabel =
        parent && parent.data && parent.data.texts
          ? parent.data.texts.join(", ")
          : "";

      // Collect response labels and texts
      let intention = current.intention ? current.intention : "";
      let responseLabel =
        current.response && current.response.label
          ? current.response.label
          : "";
      let responseTexts =
        current.response && current.response.inputs
          ? current.response.inputs.join(", ")
          : "";
      let botText =
        current.data && current.data.texts ? current.data.texts.join(", ") : "";
      let botId = current.id ? current.id : "";
      // Add the collected texts to modelPrompt
      this.modelPrompt +=
        (responseLabel.length > 0
          ? `IF Respond ${intention}ly to ${parentId} for example ${responseLabel}\n`
          : "\n") +
        (responseTexts.length > 0
          ? `Other Examples --> ${responseTexts}\n`
          : "\n") +
        (botText.length > 0 ? `Then\n${botId} --> ${botText}\n` : "\n\n");

      // this.modelPrompt +=
      //   responseLabel.length > 0
      //     ? `Response to --> ${parentId}\n > ${responseLabel}\n`
      //     : "\n";
      // this.modelPrompt +=
      //   responseTexts.length > 0
      //     ? `Response Examples --> ${responseTexts}\n`
      //     : "\n";
      // this.modelPrompt +=
      //   botText.length > 0 ? `Bot Response --> ${botText}\n\n\n\n` : "\n";

      // Enqueue children nodes
      if (current.positive && current.positive.length > 0)
        this.enqueueChildren(queue, current.positive, current);
      if (current.negative && current.negative.length > 0)
        this.enqueueChildren(queue, current.negative, current);
      if (current.neutral && current.neutral.length > 0)
        this.enqueueChildren(queue, current.neutral, current);
    }
    console.log(this.modelPrompt);
    return this.modelPrompt;
  }
}

// const list = new LinkedNodes(initNodes, initEdges);
// const JsonList = JSON.stringify(list.getTree(), null);
// console.log(JsonList);
// console.log(list.modelPrompt);
