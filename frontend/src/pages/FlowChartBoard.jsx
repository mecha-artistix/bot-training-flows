import { useEffect, useRef } from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowBoard from '../components/FlowBoard';
import { NodesProvider, useNodesContext } from '../context/NodesContext';
import DrawingControlsPanel from '../components/DrawingControlsPanel';
import TestBot from '../components/TestBot';

function FlowChartBoard() {
  const reactFlowRef = useRef(null);
  // const { phone } = useNodesContext();
  // console.log(phone);
  return (
    <>
      <ReactFlowProvider>
        <NodesProvider reactFlowRef={reactFlowRef}>
          <DrawingControlsPanel />
          <div ref={reactFlowRef} className="flex-grow">
            <FlowBoard />
          </div>
          {/* <TestBot /> */}
        </NodesProvider>
      </ReactFlowProvider>
    </>
  );
}

export default FlowChartBoard;
