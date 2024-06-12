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
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import FloatingConnectionLine from "./FloatingConnectionLine.jsx";
import { useNodesContext } from "../context/NodesContext.jsx";

function FlowBoard() {
  const {
    nodes,
    setNodes,
    nodeTypes,
    setReactFlowInstance,
    reactFlowInstance,
    edgeTypes,
    selectedElement,
    setSelectedElement,
    onElementClick,
    edges,
    setEdges,
  } = useNodesContext();

  //  DRAG AND DROP COMPONENTS
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // const type = event.dataTransfer.getData("application/reactflow");
      const type = "responsenode";

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
        type: type,
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
  const isValidConnection = useCallback(
    (connection) => {
      const { source, target } = connection;
      // Check if there's already an edge with the same source and target
      return !edges.some(
        (edge) => edge.source === source && edge.target === target
      );
    },
    [edges]
  );

  const onConnect = useCallback(
    (connection) => {
      if (connection.source == connection.target) return;
      if (connection.source == "start_node")
        return setEdges((eds) =>
          addEdge(
            {
              ...connection,
              type: "step_path",
              style: { stroke: "green", strokeWidth: 2 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "green",
              },
            },
            eds
          )
        );
      let label = "Neutral";
      let edgeStyle = { stroke: "blue", strokeWidth: 2 };
      let arrowHead = {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      };
      switch (connection.sourceHandle) {
        case "b":
          label = "Neutral";
          edgeStyle = { stroke: "blue", strokeWidth: 2 };
          arrowHead = { ...arrowHead, color: "blue" };
          break;
        case "g":
          label = "Positive";
          edgeStyle = { stroke: "green", strokeWidth: 2 };
          arrowHead = { ...arrowHead, color: "green" };
          break;
        case "r":
          label = "Negative";
          edgeStyle = { stroke: "red", strokeWidth: 2 };
          arrowHead = { ...arrowHead, color: "red" };
          break;

        default:
          break;
      }
      console.log(edges, connection);
      let newEdge = edges.find(
        (edg) =>
          edg.source == connection.source && edg.target == connection.target
      );
      console.log(newEdge ? "found" : "notfound");
      const edge = {
        ...connection,
        type: "step_labelled",
        data: { label },
        style: edgeStyle,
        markerEnd: arrowHead,
      };

      setEdges((eds) => {
        const filteredEdges = eds.filter(
          (edge) =>
            !(
              edge.source === connection.source &&
              edge.target === connection.target
            )
        );
        return addEdge(edge, filteredEdges);
      });
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
        connectionLineComponent={FloatingConnectionLine}
      >
        <Background />
      </ReactFlow>
    </>
  );
}

export default FlowBoard;
