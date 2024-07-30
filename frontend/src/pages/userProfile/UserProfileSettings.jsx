import { NavLink, Outlet } from 'react-router-dom';
import AccountSettingIcon from '../../assets/icons/AccountSettingIcon';
import SecuritySettingsIcon from '../../assets/icons/SecuritySettingsIcon';
import PaymentIcon from '../../assets/icons/PaymentIcon';
function UserProfileSettings() {
  return (
    <section className="w-[1200px] mx-auto flex flex-col space-y-10">
      <div className="account-settings-nav">
        <nav className="p-2 rounded">
          <ul className="flex w-full justify-between">
            <li>
              <AccountSettingIcon />
              <NavLink to={'account-settings'}>Account Settings</NavLink>
            </li>
            <li>
              <SecuritySettingsIcon />
              <NavLink to={'security-settings'}>Security Settings</NavLink>
            </li>
            <li>
              <PaymentIcon />
              <NavLink to={'payment-settings'}>Payment Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 h-full">
        <Outlet />
      </div>
    </section>
  );
}

export default UserProfileSettings;
