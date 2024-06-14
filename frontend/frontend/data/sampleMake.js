import { initEdges } from "./initialEdges.js";
import { initNodes } from "./initialNodes.js";

// MAX NUMBER NESTING WILL BE MAX NODES
// when source becomes the target, return the id string
// const startNode = initNodes.find((n) => n.id === "start_node"); //id: "start_node"
// const [_, node2, node3, node4] = nodes;

class Node {
  constructor(data) {
    this.id = data.id;
    this.data = data.data;
    this.intention = data.intention;
    this.response = data.response || {};
    this.positive = null;
    this.negative = null;
    this.neutral = null;
  }
  setResponse(response) {
    this.response = response;
  }
}

export class LinkedNodes {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  contains(id) {
    let count = 0;
    const countNodes = (node) => {
      if (!node) return;
      if (node.id === id) count++;

      countNodes(node.positive);
      countNodes(node.negative);
      countNodes(node.neutral);
    };
    countNodes(this.head);
    return count;
  }

  findNode(id) {
    const findId = (node) => {
      if (!node) return null;
      if (node.id === id) return node;
      return (
        findId(node.positive) || findId(node.negative) || findId(node.neutral)
      );
    };
    return findId(this.head);
  }

  append(data, id, branch) {
    const node = new Node(data);

    if (this.findNode(id)) {
      let current = this.findNode(id);
      current[branch] = node;
      current[branch].setResponse(node.response);
    } else {
      this.head = node;
    }

    this.length++;
  }

  getTree() {
    const buildTree = (node) => {
      if (!node) return null;
      return {
        id: node.id,
        data: node.data,
        response: node.response,
        intention: node.intention,
        positive: buildTree(node.positive),
        negative: buildTree(node.negative),
        neutral: buildTree(node.neutral),
      };
    };

    return buildTree(this.head);
  }
}

const startNode = initNodes.find((n) => n.id === "start_node");
const list = new LinkedNodes();
list.append(startNode);

export function makeConnectionsObj(objPrint, nodes, edges) {
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n];

    objPrint.append(node, node.id);

    const connections = edges.filter((edg) => edg.source == node.id);
    for (let e = 0; e < connections.length; e++) {
      const edg = connections[e];
      const response = edg.data;
      const nextNode = nodes.find((n) => n.id == edg.target);
      nextNode.response = response;
      nextNode.intention = "";
      let next = "";

      switch (edg.sourceHandle) {
        case "r":
          next = "negative";
          break;
        case "g":
          next = "positive";
          break;
        default:
          next = "neutral";
      }
      nextNode.intention = next;
      objPrint.append(nextNode, node.id, next);
      console.log(objPrint);
    }
  }
}
makeConnectionsObj(list, initNodes, initEdges);

const connectedList = JSON.stringify(list.getTree(), null, 2);

console.log(connectedList);
