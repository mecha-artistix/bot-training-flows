import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlowChartIcon from '../assets/icons/FlowChartIcon';
import KnowledgeBaseIcon from '../assets/icons/KnowledgeBaseIcon';
import LeadsIcon from '../assets/icons/LeadsIcon';
import RobotLogo from '../assets/images/bot_icon.svg';
import AccountSettingIcon from '../assets/icons/AccountSettingIcon';
import SecuritySettingsIcon from '../assets/icons/SecuritySettingsIcon';
import PaymentIcon from '../assets/icons/PaymentIcon';
import BotsIcon from '../assets/icons/BotsIcon';
import GearIcon from '../assets/icons/GearIcon';
import { useState } from 'react';
import LogoIcon from './LogoIcon';
function LeftPanel() {
  const [popup, setPopup] = useState(false);
  function handlePopup() {
    setPopup((popup) => (popup = !popup));
  }
  const { user } = useAuth();
  return (
    <section className="flex h-full flex-col px-2 pt-2 border">
      <div className="flex items-center space-x-4">
        {/* <img src={RobotLogo} /> */}
        <LogoIcon border="#000" />
        <h1 className="font-theme_logo font-extrabold ">{import.meta.env.VITE_SITE_NAME}</h1>
      </div>
      <nav className="leftbar_nav">
        <ul className="list-none space-y-7 pt-[20%] text-lg ">
          <li>
            <FlowChartIcon />
            <NavLink to={`/`}>Flowcharts</NavLink>
          </li>
          <li>
            <KnowledgeBaseIcon />
            <NavLink to={`/knowledgebase`}>Knowledgebase</NavLink>
          </li>
          <li>
            <BotsIcon />
            <NavLink to={`/bots`}>Bots</NavLink>
          </li>
          <li>
            <LeadsIcon />
            <NavLink to={`/leads`}>Leads</NavLink>
          </li>
        </ul>
      </nav>
      <div className="mb-14 mt-auto border-t text-center">
        <nav>
          <ul className="flex flex-col space-y-3 last:pt-3  ">
            {popup && (
              <>
                <li className="hover:text-primary">
                  <AccountSettingIcon />
                  <NavLink to={'/user-profile/account-settings'}>Account Settings</NavLink>
                </li>
                <li className="hover:text-primary">
                  <SecuritySettingsIcon />
                  <NavLink to={'/user-profile/security-settings'}>Security Settings</NavLink>
                </li>
                <li className="hover:text-primary">
                  <PaymentIcon />
                  <NavLink to={'/user-profile/payment-settings'}>Payment Settings</NavLink>
                </li>
              </>
            )}

            <li onClick={handlePopup} className="hover:text-primary">
              <span>
                <GearIcon />
              </span>
              <NavLink to={`/user-profile/account-settings`} className="text-lg capitalize ">
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default LeftPanel;
