import { useEffect, useState, useRef, useCallback } from "react";
import { useNodesContext } from "../context/NodesContext";
import { LinkedNodes } from "../utils/generateModelClass";
// import ModelPrompt from "./ModelPrompt";
function DrawingControlsPanel() {
  const {
    nodes,
    setNodes,
    edges,
    coords,
    reactFlowRef,
    updateMouseCoords,
    reactFlowInstance,
    nodeConnections,
  } = useNodesContext();
  const [viewPrompt, setViewPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef(null);

  useEffect(() => {
    const currentRef = reactFlowRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", updateMouseCoords);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", updateMouseCoords);
      }
    };
  }, [reactFlowInstance]);

  const generatePrompt = useCallback(() => {
    const list = new LinkedNodes(nodes, edges);
    setPrompt(list.generateModel()); // Ensure prompt is generated and set
  }, [nodes, edges]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  useEffect(() => {
    const list = new LinkedNodes(nodes, edges);
    setPrompt(list.modelPrompt);
    console.log(nodes);
  }, [nodes, edges]);

  const handleMake = () => {
    // const list = new LinkedNodes(nodes, edges);
    // setPrompt(list.modelPrompt);

    setViewPrompt((viewPrompt) => !viewPrompt);
    // console.log(
    //   "nodeConnections",
    //   nodeConnections,
    //   "\n",
    //   "edges",
    //   edges,
    //   "\n",
    //   "nodes",
    //   nodes
    // );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (promptRef.current && !promptRef.current.contains(event.target)) {
        setViewPrompt(false); // Close the prompt if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {viewPrompt && (
        <div
          ref={promptRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md z-50 p-4 border border-slate-500 w-9/12 h-[600px] overflow-y-auto"
        >
          <div className="w-full h-full" style={{ whiteSpace: "pre-wrap" }}>
            {prompt}
          </div>
        </div>
      )}
      <div className="w-full p-2 flex justify-between">
        <div
          className="border p-2 text-xs"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Drag and Drop Node
        </div>
        <button
          className="text-xs bg-slate-100 rounded-full px-2 py-1 hover:shadow-sm"
          onClick={handleMake}
        >
          Make
        </button>
        <div className="">
          Mouse- X:{coords.x.toFixed(2)}, Y:{coords.y.toFixed(2)}
        </div>
      </div>
    </>
  );
}

export default DrawingControlsPanel;

// const onNodeAdd = () => {
//   setNodes((nodes) => {
//     const lastNode = nodes[nodes.length - 1];
//     const newNode = {
//       id: `node-${nodes.length + 1}`,
//       type: "responsenode",
//       position: {
//         x: lastNode ? lastNode.position.x : 0,
//         y: lastNode ? lastNode.position.y + 150 : 0,
//       },
//       data: {},
//     };
//     return [...nodes, newNode];
//   });
// };
// const logEdges = () => {
//   console.log(edges);
// };
// const logNodes = () => {
//   console.log(nodes);
// };
