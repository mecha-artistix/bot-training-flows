import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LeftPanel() {
  const { user } = useAuth();
  return (
    <section className="flex flex-col px-2 pt-2 h-full">
      <div>
        <h1 className="text-white text-center text-2xl font-extrabold">{import.meta.env.VITE_SITE_NAME}</h1>
      </div>
      <nav className="leftbar_nav">
        <ul className="text-white text-lg font-semibold list-none pl-[20%] pt-[20%] space-y-2">
          <li>
            <NavLink to={`/`}>Flowcharts</NavLink>
          </li>
          <li>
            <NavLink to={`/knowledgebase`}>Knowledgebase</NavLink>
          </li>
          <li>
            <NavLink to={`/leads`}>Leads</NavLink>
            {/* /${user.userID} */}
          </li>
        </ul>
      </nav>
      <div className="mt-auto text-center border-t border-t-cwu_dk_charcoal">
        <span className="text-white font-extrabold text-xl capitalize">{user.username}</span>
      </div>
    </section>
  );
}

export default LeftPanel;
