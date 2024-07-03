import { useEffect, useState, useRef, useCallback } from 'react';
import { useNodesContext } from '../context/NodesContext';
import { LinkedNodes } from '../utils/generateModelClass';
// import { useParams,useLocation  } from 'react-router-dom';
import useQuery from '../utils/useQuery';
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
  function updatePrompt() {
    const list = new LinkedNodes(nodes, edges);
    list.generateModel();
    setPrompt(list.generateModel());
  }

  useEffect(() => {
    updatePrompt();
  }, [nodes, edges]);
  async function handleSaveFLow() {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleViewPrompt() {
    setViewPrompt((viewPrompt) => !viewPrompt);
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
      {viewPrompt && (
        <div
          ref={promptRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md z-50 p-4 border border-slate-500 w-9/12 h-[600px] overflow-y-auto"
        >
          <div className="w-full h-full" style={{ whiteSpace: 'pre-wrap' }}>
            <button className="fixed top-4 right-4" onClick={() => setViewPrompt(false)}>
              ⛔
            </button>
            {prompt}
          </div>
        </div>
      )}
      <div className="w-full p-2 flex justify-between">
        <div className="cwu_magent_btn" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Drag and Drop Node
        </div>
        <div className="ml-auto space-x-1">
          <button className="cwu_magent_btn" onClick={handleSaveFLow}>
            Save Flow
          </button>
          <button className="cwu_magent_btn" onClick={handleViewPrompt}>
            Generate Prompt
          </button>
        </div>
      </div>
    </>
  );
}

export default DrawingControlsPanel;
