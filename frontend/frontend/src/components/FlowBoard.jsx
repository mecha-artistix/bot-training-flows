import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  isNode,
  isEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNodesContext } from "../context/NodesContext.jsx";

function FlowBoard() {
  const {
    nodes,
    setNodes,
    nodeTypes,
    setReactFlowInstance,
    reactFlowInstance,
    coords,
    edgeTypes,
    selectedElement,
    setSelectedElement,
    onElementClick,
  } = useNodesContext();
  const { edges, setEdges } = useNodesContext();

  //  DRAG AND DROP COMPONENTS
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: "responsenode",
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );
  //  HANDLE CHANGES IN ELEMENTS
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  //  HANDLE CONDITIONAL CONNECTION LOGIC
  const onConnect = useCallback(
    (connection) => {
      console.log(connection);
      let label = "Neutral";
      let edgeStyle = { stroke: "blue", strokeWidth: 2 };
      switch (connection.sourceHandle) {
        case "b":
          label = "Neutral";
          edgeStyle = { stroke: "blue", strokeWidth: 2 };
          break;
        case "g":
          label = "Positive";
          edgeStyle = { stroke: "green", strokeWidth: 2 };
          break;
        case "r":
          label = "Negative";
          edgeStyle = { stroke: "red", strokeWidth: 2 };
          break;

        default:
          break;
      }

      const edge = {
        ...connection,
        type: "label-path",
        data: { label },
        style: edgeStyle,
      };

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  //  HANDLE DELETE KEY LOGIC
  const deleteSelectedElement = useCallback(() => {
    if (selectedElement) {
      if (isNode(selectedElement)) {
        const nodeID = selectedElement.id;
        setNodes((nds) => nds.filter((node) => node.id !== selectedElement.id));
        setEdges((eds) =>
          eds.filter((edge) => edge.source !== nodeID && edge.target !== nodeID)
        );
      } else if (isEdge(selectedElement)) {
        setEdges((eds) => eds.filter((edge) => edge.id !== selectedElement.id));
      }
      setSelectedElement(null);
    }
  }, [selectedElement]);
  // Event listener for the delete key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        deleteSelectedElement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteSelectedElement]);

  return (
    <>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        onInit={setReactFlowInstance}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        edgeTypes={edgeTypes}
        onNodeClick={onElementClick}
        onEdgeClick={onElementClick}
        elementsSelectable={true}
      >
        <Background />
      </ReactFlow>
    </>
  );
}

export default FlowBoard;
