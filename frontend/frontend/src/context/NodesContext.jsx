import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, isNode, isEdge } from 'reactflow';
import ResponseNode from '../components/nodes/ResponseNode';
import { ActionNode, startNode } from '../components/nodes/ActionNode';
import { Step_labelled_path, SmoothStepPath } from '../components/edges/CustomEdges';
// import { initNodes } from "../../data/initialNodes.js";
// import { initEdges } from "../../data/initialEdges.js";

const NodesContext = createContext();

const nodeTypes = { responsenode: ResponseNode, actionnode: ActionNode };
const edgeTypes = {
  step_labelled: Step_labelled_path,
  step_path: SmoothStepPath,
};

function NodesProvider({ children, reactFlowRef }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(startNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElement, setSelectedElement] = useState();

  const [nodeConnections, setNodeConnections] = useState({});

  useEffect(() => {
    const connections = nodes.reduce((acc, node) => {
      acc[node.id] = edges
        .filter((edge) => edge.source === node.id || edge.target === node.id)
        .map((edge) => (edge.source === node.id ? edge.target : edge.source));
      return acc;
    }, {});

    setNodeConnections(connections);
  }, [nodes, edges]);

  const onElementClick = useCallback((event, element) => {
    setSelectedElement(element);

    if (isNode(element)) {
      // Add node-specific logic here
    } else if (isEdge(element)) {
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

  // // loggin nodes and edges for debugging
  // useEffect(() => {
  //   console.log('nodes > ', nodes, 'edges > ', edges);
  // }, [nodes, edges]);

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
    nodeConnections,
  };

  return <NodesContext.Provider value={values}>{children}</NodesContext.Provider>;
}
function useNodesContext() {
  const context = useContext(NodesContext);
  return context;
}

export { NodesProvider, useNodesContext };
