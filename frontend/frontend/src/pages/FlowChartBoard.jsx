import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";
import FlowBoard from "../components/FlowBoard";
import { NodesProvider } from "../context/NodesContext";
import DrawingControlsPanel from "../components/DrawingControlsPanel";
const style = { height: "90vh", width: "90vw", border: "1px solid black" };

function FlowChartBoard() {
  const reactFlowRef = useRef(null);

  return (
    <>
      <ReactFlowProvider>
        <NodesProvider reactFlowRef={reactFlowRef}>
          <DrawingControlsPanel />
          <div ref={reactFlowRef} style={style}>
            <FlowBoard />
          </div>
        </NodesProvider>
      </ReactFlowProvider>
    </>
  );
}

export default FlowChartBoard;
