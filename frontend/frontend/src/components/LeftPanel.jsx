import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlowChartIcon from '../assets/icons/FlowChartIcon';
import KnowledgeBaseIcon from '../assets/icons/KnowledgeBaseIcon';
import LeadsIcon from '../assets/icons/LeadsIcon';

function LeftPanel() {
  const { user } = useAuth();
  return (
    <section className="bg-primary flex h-full flex-col px-2 pt-2">
      <div>
        <h1 className="font-theme_logo text-center text-2xl font-extrabold text-white">
          {import.meta.env.VITE_SITE_NAME}
        </h1>
      </div>
      <nav className="leftbar_nav">
        <ul className="list-none space-y-7 pl-[20%] pt-[20%] text-lg font-semibold text-white">
          <li>
            <FlowChartIcon />
            <NavLink to={`/`}>Flowcharts</NavLink>
          </li>
          <li>
            <KnowledgeBaseIcon />
            <NavLink to={`/knowledgebase`}>Knowledgebase</NavLink>
          </li>
          <li>
            <LeadsIcon />
            <NavLink to={`/leads`}>Leads</NavLink>
            {/* /${user.userID} */}
          </li>
        </ul>
      </nav>
      <div className="border-t-primary mt-auto border-t text-center">
        <span className="text-xl font-extrabold capitalize text-white">{user.username}</span>
      </div>
    </section>
  );
}

export default LeftPanel;
