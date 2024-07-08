import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlowChartIcon from '../assets/icons/FlowChartIcon';
import KnowledgeBaseIcon from '../assets/icons/KnowledgeBaseIcon';
import LeadsIcon from '../assets/icons/LeadsIcon';

import AccountSettingIcon from '../assets/icons/AccountSettingIcon';
import SecuritySettingsIcon from '../assets/icons/SecuritySettingsIcon';
import PaymentIcon from '../assets/icons/PaymentIcon';
import BotsIcon from '../assets/icons/BotsIcon';
import GearIcon from '../assets/icons/GearIcon';
import { useState } from 'react';
function LeftPanel() {
  const [popup, setPopup] = useState(false);
  function handlePopup() {
    setPopup((popup) => (popup = !popup));
  }
  const { user } = useAuth();
  return (
    <section className="flex h-full flex-col bg-primary px-2 pt-2">
      <div>
        <h1 className="text text-center font-theme_logo font-extrabold text-white">{import.meta.env.VITE_SITE_NAME}</h1>
      </div>
      <nav className="leftbar_nav">
        <ul className="list-none space-y-7 pt-[20%] text-lg text-white">
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
      <div className="mb-14 mt-auto border-t border-t-primary text-center">
        <nav>
          <ul className="flex flex-col space-y-2 text-white last:pt-3">
            {popup && (
              <>
                <li>
                  <span>
                    <AccountSettingIcon />
                  </span>
                  <p>Account Settings</p>
                </li>
                <li>
                  <span>
                    <SecuritySettingsIcon />
                  </span>
                  <p>Security Settings</p>
                </li>
                <li>
                  <span>
                    <PaymentIcon />
                  </span>
                  <p>Payment Settings</p>
                </li>
              </>
            )}

            <li onClick={handlePopup}>
              <span>
                <GearIcon />
              </span>
              <p className="text-lg capitalize text-white">Settings</p>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default LeftPanel;
