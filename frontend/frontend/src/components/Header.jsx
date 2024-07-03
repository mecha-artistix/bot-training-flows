import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { startNode } from './nodes/ActionNode';
function Header() {
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
            nodes: [],
            edges: [],
            user: localStorage.getItem('userID'),
          }),
        });
        if (!response.ok) throw new Error(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    createFlowInstance();
    navigate(`/create-flowchart?flow=${flowName}`);
    setPopup(false);
  }
  return (
    <div className="py-2 px-2 flex items-center justify-between border-cwu_dk_charcoal border-b-2">
      <div className="relative p-0">
        <button onClick={handleClick}>Create New Flow +</button>
        {popup && (
          <div className="absolute left-0 translate-y-10 py-10 px-10 z-50 bg-gray-400 top-0 flex ">
            <input
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
      {/* <Link to="/create-flowchart">Create New Flow +</Link> */}
      <button className="cwu_magent_btn">Import File</button>
    </div>
  );
}

export default Header;
