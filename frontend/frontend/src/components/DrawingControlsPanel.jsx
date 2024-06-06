import { useEffect } from "react";
import { useNodesContext } from "../context/NodesContext";

function DrawingControlsPanel() {
  const {
    nodes,
    setNodes,
    edges,
    coords,
    reactFlowRef,
    updateMouseCoords,
    reactFlowInstance,
  } = useNodesContext();

  const onNodeAdd = () => {
    console.log("onaddnode");
    setNodes((nodes) => {
      const lastNode = nodes[nodes.length - 1];
      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: "responsenode",
        position: {
          x: lastNode ? lastNode.position.x : 0,
          y: lastNode ? lastNode.position.y + 150 : 0,
        },
        data: {},
      };
      return [...nodes, newNode];
    });
  };
  const logEdges = () => {
    console.log(edges);
  };
  const logNodes = () => {
    console.log(nodes);
  };

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

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const handleMake = () => {
    console.log("nodes=>", nodes, "\n", "edges=>", edges);
  };

  return (
    <div>
      <div className="p-2 flex justify-between">
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
          Mouse Coordinates: ({coords.x.toFixed(2)}, {coords.y.toFixed(2)})
        </div>
      </div>
    </div>
  );
}

export default DrawingControlsPanel;
