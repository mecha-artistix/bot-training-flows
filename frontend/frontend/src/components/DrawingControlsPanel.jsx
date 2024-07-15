import { useEffect, useState, useRef, useCallback } from 'react';
import { useNodesContext } from '../context/NodesContext';
import { LinkedNodes } from '../utils/generateModelClass';
// import { useParams,useLocation  } from 'react-router-dom';
import useQuery from '../utils/useQuery';
import AddNewFlowChartIcon from '../assets/icons/AddNewFlowChartIcon';
import CreateNewFlow from './CreateNewFlow';
import TestBot from './TestBot';
// import ModelPrompt from "./ModelPrompt";
function DrawingControlsPanel() {
  const { nodes, setNodes, edges, coords, reactFlowRef, updateMouseCoords, reactFlowInstance, nodeConnections } =
    useNodesContext();
  // const [viewPrompt, setViewPrompt] = useState(false);
  // const [prompt, setPrompt] = useState('');
  const [phone, setPhone] = useState(false);
  const promptRef = useRef(null);
  const flowName = useQuery().get('flow');
  const userID = localStorage.getItem('userID');
  const [botId, setBotId] = useState(null);
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
      setBotId(data.flowchart.bot);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveFLow = async () => {
    await saveFlow();
  };

  // const handleViewPrompt = async () => {
  //   // saveFlow().then((res) => setPrompt(res.flowchart.promptText));

  //   // setViewPrompt((viewPrompt) => !viewPrompt);
  //   // console.log(saveFlow());
  //   // setPrompt(saveFlow().flowchart.promptText);
  // };

  function handleTestBot() {
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
      {phone && <TestBot name={flowName} userId={userID} closeChat={handleCloseChat} botId={botId} />}
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

          <button className="cwu_accent_btn" onClick={handleTestBot}>
            Test Bot
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawingControlsPanel;
