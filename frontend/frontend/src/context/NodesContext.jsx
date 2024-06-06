import { createContext, useState, useContext, useCallback } from "react";
import { useNodesState, useEdgesState, isNode, isEdge } from "reactflow";
import ResponseNode from "../components/ResponseNode";
import {
  StraightPath,
  SmoothStepPath,
  BezierPath,
  EdgeLabelled,
} from "../components/CustomEdges";
import initialNodes from "../../data/initialNodes";
import initialEdges from "../../data/initialEdges";

const NodesContext = createContext();

const nodeTypes = { responsenode: ResponseNode };
const edgeTypes = {
  "straight-edge": StraightPath,
  "step-path": SmoothStepPath,
  "label-path": BezierPath,
  "edge-labelled": EdgeLabelled,
};

function NodesProvider({ children, reactFlowRef }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElement, setSelectedElement] = useState();

  const onElementClick = useCallback((event, element) => {
    setSelectedElement(element);

    if (isNode(element)) {
      console.log("Node clicked:", element);
      // Add node-specific logic here
    } else if (isEdge(element)) {
      console.log("Edge clicked:", element);
      // Add edge-specific logic here
    }
  }, []);

  const updateMouseCoords = (event) => {
    if (!reactFlowRef.current || !reactFlowInstance) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    setCoords({ x: position.x, y: position.y });
  };

  const values = {
    reactFlowRef,
    nodeTypes,
    edgeTypes,
    nodes,
    setNodes,
    onNodesChange,
    coords,
    reactFlowInstance,
    setReactFlowInstance,
    updateMouseCoords,
    edges,
    setEdges,
    onEdgesChange,
    selectedElement,
    setSelectedElement,
    onElementClick,
  };

  return (
    <NodesContext.Provider value={values}>{children}</NodesContext.Provider>
  );
}
function useNodesContext() {
  const context = useContext(NodesContext);
  return context;
}

export { NodesProvider, useNodesContext };
