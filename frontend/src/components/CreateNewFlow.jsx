import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { startNode } from './nodes/ActionNode';
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie';
import { createFlowchart } from '../utils/fetchFlowchart';

function CreateNewFlow() {
  const token = Cookies.get('bearer_token');
  const [flowName, setFlowName] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setPopup((prev) => !prev);
  }
  async function handleCreateFlow() {
    const data = await createFlowchart(
      JSON.stringify({
        name: flowName,
        nodes: startNode,
      }),
    );

    if (data) {
      navigate(`/create-flowchart?flow=${data.data.data._id}`);
      setPopup(false);
      setFlowName('');
    }
  }

  return (
    <div className="relative p-0">
      <button className="font-bold" onClick={handleClick}>
        Create New Flow<span className="text-lg text-accent">+</span>
      </button>
      {popup && (
        <div className="absolute left-0 top-0 z-50 flex translate-y-10 bg-theme_grey px-10 py-10">
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
