import { useCallback, useState, useEffect, useRef } from "react";
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
import { makeEdgeStyle } from "../utils/makeEdgeStyle.js";

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
  const connectingNodeId = useRef(null);
  //  DRAG AND DROP COMPONENTS
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `node-${nodes.length}`,
        type: "responsenode",
        position,
        data: {},
      };

      setNodes((nds) => [...nds, newNode]);
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

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((event) => {
    if (connectingNodeId.current) return;
    console.log(connectingNodeId, event);

    // const { label, edgeStyle, arrowHead } = makeEdgeStyle(connection);
    // // console.log(source);
    // const targetIsPane = event.target.classList.contains("react-flow__pane");
    // if (targetIsPane) {
    //   // Handle creating a new node at the drop position
    //   const position = reactFlowInstance.screenToFlowPosition({
    //     x: event.clientX,
    //     y: event.clientY,
    //   });

    //   const newNode = {
    //     id: `node-${nodes.length}`,
    //     type: "responsenode",
    //     position,
    //     data: { label },
    //   };
    //   console.log(newNode);
    //   setNodes((nds) => [...nds, newNode]);
    //   const newEdge = {
    //     ...connection,
    //     source,
    //     target: newNode.id,
    //     type: "step_labelled",
    //     data: { label },
    //     style: edgeStyle,
    //     markerEnd: arrowHead,
    //   };

    //   setEdges((eds) => addEdge(newEdge, eds));
    // }
  });

  const onConnect = useCallback(
    (connection, event) => {
      const { source, target } = connection;
      if (source == target) return;
      if (source == "start_node") {
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
      }
      const { label, edgeStyle, arrowHead } = makeEdgeStyle(connection);

      //// ---------------- IF TARGET IS PANE
      const targetIsPane = event.target.classList.contains("react-flow__pane");
      if (targetIsPane) {
        // Handle creating a new node at the drop position
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode = {
          id: `node-${nodes.length}`,
          type: "responsenode",
          position,
          data: { label },
        };
        console.log(newNode);
        setNodes((nds) => [...nds, newNode]);
        const newEdge = {
          ...connection,
          source,
          target: newNode.id,
          type: "step_labelled",
          data: { label },
          style: edgeStyle,
          markerEnd: arrowHead,
        };

        setEdges((eds) => addEdge(newEdge, eds));
      }
      //// ---------------- IF TARGET IS A NODE
      else {
        connectingNodeId.current = null;
        const edge = {
          ...connection,
          type: "step_labelled",
          data: { label },
          style: edgeStyle,
          markerEnd: { ...arrowHead },
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
      }
    },
    [nodes.length, reactFlowInstance, setNodes, setEdges]
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
        onConnectStart={onConnectStart}
        onConnectEnd={onConnect}
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
