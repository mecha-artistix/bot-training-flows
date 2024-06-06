const initEdges = [
  {
    source: "node-1",
    sourceHandle: "r",
    target: "node-4",
    targetHandle: "b",
    type: "label-path",
    data: {
      label: "Negative",
    },
    style: {
      stroke: "red",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-1r-node-4b",
  },
  {
    source: "node-4",
    sourceHandle: "g",
    target: "node-2",
    targetHandle: "b",
    type: "label-path",
    data: {
      label: "Positive",
    },
    style: {
      stroke: "green",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-4g-node-2b",
  },
  {
    source: "node-1",
    sourceHandle: "g",
    target: "node-2",
    targetHandle: "b",
    type: "label-path",
    data: {
      label: "Positive",
    },
    style: {
      stroke: "green",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-1g-node-2b",
  },
  {
    source: "node-2",
    sourceHandle: "r",
    target: "node-5",
    targetHandle: "r",
    type: "label-path",
    data: {
      label: "Negative",
    },
    style: {
      stroke: "red",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-2r-node-5r",
  },
  {
    source: "node-5",
    sourceHandle: "g",
    target: "node-3",
    targetHandle: "g",
    type: "label-path",
    data: {
      label: "Positive",
    },
    style: {
      stroke: "green",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-5g-node-3g",
  },
  {
    source: "node-2",
    sourceHandle: "g",
    target: "node-3",
    targetHandle: "g",
    type: "label-path",
    data: {
      label: "Positive",
    },
    style: {
      stroke: "green",
      strokeWidth: 2,
    },
    id: "reactflow__edge-node-2g-node-3g",
  },
];

export default initEdges;
