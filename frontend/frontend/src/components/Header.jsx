import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { startNode } from './nodes/ActionNode';
import { useAuth } from '../context/AuthContext';
import Logout from '../assets/icons/LogoutIcon';
import HomeIcon from '../assets/icons/HomeIcon';
import UserProfileIcon from '../assets/icons/UserProfileIcon';
function Header() {
  const [flowName, setFlowName] = useState('');
  const [popup, setPopup] = useState(false);
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
  function handleSignOut() {
    logout();
    // navigate(`/sign-in`);
  }
  return (
    <div className="flex items-center justify-between border-b-2 border-primary px-2 py-2">
      <div className="relative flex space-x-1 p-0">
        <HomeIcon />
        <button>Home</button>
      </div>

      <span onClick={handleClick} className="flex space-x-1">
        <UserProfileIcon />

        <button className="font-bold capitalize">{user.username}</button>
      </span>

      {popup && (
        <div className="absolute right-0 top-0 z-50 flex translate-y-10 space-y-2 border border-theme_grey bg-white px-3 py-4">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li>
                <span>
                  <UserProfileIcon />
                </span>
                <p>Profile</p>
              </li>
              <li onClick={handleSignOut}>
                <span>
                  <Logout />
                </span>
                <p>Sign Out</p>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;
