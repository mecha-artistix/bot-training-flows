import { useEffect, useState, useRef, useCallback } from 'react';
import { useNodesContext } from '../context/NodesContext';
import { LinkedNodes } from '../utils/generateModelClass';
// import { useParams,useLocation  } from 'react-router-dom';
import useQuery from '../utils/useQuery';
import AddNewFlowChartIcon from '../assets/icons/AddNewFlowChartIcon';
import CreateNewFlow from './CreateNewFlow';
// import ModelPrompt from "./ModelPrompt";
function DrawingControlsPanel() {
  const { nodes, setNodes, edges, coords, reactFlowRef, updateMouseCoords, reactFlowInstance, nodeConnections } =
    useNodesContext();
  const [viewPrompt, setViewPrompt] = useState(false);
  const [prompt, setPrompt] = useState('');
  const promptRef = useRef(null);
  const flowName = useQuery().get('flow');
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const currentRef = reactFlowRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', updateMouseCoords);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', updateMouseCoords);
      }
    };
  }, [reactFlowInstance]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // function updatePrompt() {
  //   const list = new LinkedNodes(nodes, edges);
  //   list.generateModel();
  //   setPrompt(list.generateModel());
  // }

  // useEffect(() => {
  //   updatePrompt();
  // }, [nodes, edges]);

  async function saveFlow() {
    try {
      const response = await fetch(import.meta.env.VITE_NODE_BASE_API + `flowcharts/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: flowName,
          nodes: nodes,
          edges: edges,
          user: userID,
        }),
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveFLow = async () => {
    await saveFlow();
  };

  const handleViewPrompt = async () => {
    saveFlow().then((res) => setPrompt(res.flowchart.promptText));

    setViewPrompt((viewPrompt) => !viewPrompt);
    // console.log(saveFlow());
    // setPrompt(saveFlow().flowchart.promptText);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (promptRef.current && !promptRef.current.contains(event.target)) {
        setViewPrompt(false); // Close the prompt if clicked outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {viewPrompt && (
        <div
          ref={promptRef}
          className="absolute left-1/2 top-1/2 z-50 h-[600px] w-9/12 -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto border border-slate-500 p-4 backdrop-blur-md"
        >
          <div className="h-full w-full" style={{ whiteSpace: 'pre-wrap' }}>
            <button className="fixed right-4 top-4" onClick={() => setViewPrompt(false)}>
              ⛔
            </button>
            {prompt}
          </div>
        </div>
      )}
      <div className="flex w-full justify-between p-2">
        <span className="flex flex-col">
          <CreateNewFlow />
          <div
            className="absolute z-10 flex translate-y-10 items-center space-x-2"
            onDragStart={(event) => onDragStart(event, 'default')}
            draggable
          >
            <span>Add New</span>
            <AddNewFlowChartIcon />
          </div>
        </span>

        <div className="ml-auto space-x-1">
          <button className="cwu_magent_btn" onClick={handleSaveFLow}>
            Save
          </button>

          <button className="cwu_accent_btn" onClick={handleViewPrompt}>
            Test Bot
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawingControlsPanel;
