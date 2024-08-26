import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { startNode } from './nodes/ActionNode';
import { useAuth } from '../context/AuthContext';
import Logout from '../assets/icons/LogoutIcon';
import HomeIcon from '../assets/icons/HomeIcon';
import UserProfileIcon from '../assets/icons/UserProfileIcon';
import { getUser } from '../pages/userProfile/fetchUser';
function Header() {
  const [flowName, setFlowName] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  function handleClick() {
    setPopup((prev) => !prev);
  }

  console.log(user);
  function handleSignOut() {
    logout();
    navigate(`/sign-in`);
  }
  useEffect(() => {
    async function getUserProfile(id) {
      const profile = await getUser(user.userId);
      setProfileImage(`${import.meta.env.VITE_NODE_BASE_API}public/img/users/${profile.photo}`);
    }
    getUserProfile(user.userId);
  }, [user]);

  return (
    <div className="flex items-center justify-between border-b px-2 py-2">
      <div className="relative flex space-x-1 p-0">
        <HomeIcon />
        <button>Home</button>
      </div>

      <span onClick={handleClick} className="flex space-x-1">
        {profileImage ? (
          <div>
            <img className="header-icon rounded-full" src={profileImage} />
          </div>
        ) : (
          <UserProfileIcon />
        )}
        {/* <UserProfileIcon /> */}
        <div>
          <img src="" />
        </div>

        <button className="font-bold capitalize">{user.username}</button>
      </span>

      {popup && (
        <div className="absolute right-0 top-0 z-50 flex translate-y-10 space-y-2 border border-theme_grey bg-white px-3 py-4">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link to={'/user-profile/account-settings'}>
                  <UserProfileIcon />
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={handleSignOut}>
                  <Logout />
                  Sign Out
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;
