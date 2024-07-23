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

// class LinkedList{
//     constructor()
// }
