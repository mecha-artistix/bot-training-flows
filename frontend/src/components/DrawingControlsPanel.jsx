import { useEffect, useState, useRef, useCallback } from 'react';
import { useNodesContext } from '../context/NodesContext';
import { LinkedNodes } from '../utils/generateModelClass';
// import { useParams,useLocation  } from 'react-router-dom';
import useQuery from '../utils/useQuery';
import AddNewFlowChartIcon from '../assets/icons/AddNewFlowChartIcon';
import CreateNewFlow from './CreateNewFlow';
import { postFlowchart, createFlowchart, updateFlowchart } from '../utils/fetchFlowchart';
import TestBot from './TestBot';
import Cookies from 'js-cookie';
import { postBot } from '../utils/fetchBot';
import Loader from '../assets/loaders/loader';
// import ModelPrompt from "./ModelPrompt";
function DrawingControlsPanel() {
  const token = Cookies.get('bearer_token');

  const { nodes, setNodes, edges, coords, reactFlowRef, updateMouseCoords, reactFlowInstance, nodeConnections } =
    useNodesContext();
  // const [viewPrompt, setViewPrompt] = useState(false);
  // const [prompt, setPrompt] = useState('');
  const [phone, setPhone] = useState(false);
  const promptRef = useRef(null);
  const flowchartId = useQuery().get('flow');
  // const flowchartId = '669fea9bd66520db5d0060c8';
  console.log(flowchartId);
  // const userID = localStorage.getItem('userID');
  const [botId, setBotId] = useState('');
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

  async function handleSaveFlow() {
    const body = JSON.stringify({
      nodes: nodes,
      edges: edges,
    });
    const data = await updateFlowchart(flowchartId, body);
  }
  useQuery();
  async function handleTestBot() {
    console.log('test');
    const flowchartBody = JSON.stringify({
      nodes: nodes,
      edges: edges,
    });
    const flowchartData = await updateFlowchart(flowchartId, flowchartBody);

    setPhone((phone) => true);
  }
  function handleCloseChat() {
    setPhone((phone) => false);
  }

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
      {phone && <TestBot closeChat={handleCloseChat} flowchartId={flowchartId} />}
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
          <button className="cwu_magent_btn" onClick={handleSaveFlow}>
            Save
          </button>

          <button className="cwu_accent_btn" onClick={handleTestBot}>
            Test Bot
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawingControlsPanel;
