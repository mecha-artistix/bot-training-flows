import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { startNode } from './nodes/ActionNode';

function CreateNewFlow() {
  const [flowName, setFlowName] = useState('');
  const [popup, setPopup] = useState(false);
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();
  function handleClick() {
    setPopup((prev) => !prev);
  }
  function handleCreateFlow() {
    async function createFlowInstance() {
      try {
        const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}flowcharts/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: flowName, //{ type: String, required: true },
            nodes: startNode,
            // edges: [],
            user: localStorage.getItem('userID'),
          }),
        });
        if (!response.ok) throw new Error(response);
        else navigate(`/create-flowchart?flow=${flowName}`);
      } catch (error) {
        console.log(error.message);
      }
    }
    createFlowInstance();
    // navigate(`/create-flowchart?flow=${flowName}`);
    setPopup(false);
    setFlowName('');
  }

  return (
    <div className="relative p-0">
      <button className="font-bold" onClick={handleClick}>
        Create New Flow <span className="text-lg text-accent">+</span>
      </button>
      {popup && (
        <div className="bg-theme_grey absolute left-0 top-0 z-50 flex translate-y-10 px-10 py-10">
          <input
            className="w-60 p-2"
            type="text"
            placeholder="Set Flow Name"
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
          />
          <button className="cwu_magent_btn" onClick={handleCreateFlow}>
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateNewFlow;
