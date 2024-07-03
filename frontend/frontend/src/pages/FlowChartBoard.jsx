import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";
import FlowBoard from "../components/FlowBoard";
import { NodesProvider } from "../context/NodesContext";
import DrawingControlsPanel from "../components/DrawingControlsPanel";

function FlowChartBoard() {
  const reactFlowRef = useRef(null);

  return (
    <>
      <ReactFlowProvider>
        <NodesProvider reactFlowRef={reactFlowRef}>
          <DrawingControlsPanel />
          <div ref={reactFlowRef} className="flex-grow">
            <FlowBoard />
          </div>
        </NodesProvider>
      </ReactFlowProvider>
    </>
  );
}

export default FlowChartBoard;
