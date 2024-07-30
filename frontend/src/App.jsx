import { BrowserRouter, Route, Routes, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthProvider, useAuth } from './context/AuthContext';
import UserLoginRegister from './pages/UserLoginRegister';
import FlowChartBoard from './pages/FlowChartBoard';
import LoginForm from './authentication/LoginForm';
import RegisterForm from './authentication/RegisterForm';
import WorkSpace from './components/WorkSpace';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import FlowCharts from './pages/FlowCharts';
import KnowledgeBase from './pages/KnowledgeBase';
import Leads from './pages/Leads';
import Bots from './pages/Bots';
import { useEffect } from 'react';
import SecondryNavigation from './components/SecondryNavigation';
import PasswordReset, { ConfirmPassword, EnterEmail } from './authentication/PasswordReset';
import UserProfileSettings from './pages/userProfile/UserProfileSettings';
import AccountSettings from './pages/userProfile/AccountSettings';
import SecuritySettings from './pages/userProfile/SecuritySettings';
import PaymentSettings from './pages/userProfile/PaymentSettings';
import verifyToken from './context/verifyToken';

const register_path = '/sign-in';
const singIn_path = 'sign-in';
const singUp_path = 'register';

function App() {
  const { user, verifyToken, dispatch } = useAuth();

  useEffect(() => {
    async function verify() {
      // console.log('verif');
      if (!Cookies.get('jwt')) {
        return 'fail';
      }
      const data = await verifyToken();
      if (data.status === 'fail') {
        return 'fail';
      }
      dispatch({ type: 'login', payload: { username: data.user.username, userId: data.user._id } });
    }
    verify();
  }, []);

  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="forget-password" element={<PasswordReset />}>
            <Route index element={<EnterEmail />} />
            <Route path="resetPassword/:id" element={<ConfirmPassword />} />
          </Route>
          <Route path={singIn_path} element={<UserLoginRegister />}>
            <Route index element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<AuthenticatedApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AuthenticatedApp() {
  const { user, verifyToken, dispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to execute on route change
    const handleRouteChange = async () => {
      const data = await verifyToken();
      if (!data) {
        dispatch({ type: 'logout' });
        navigate(singIn_path);
      }
    };

    handleRouteChange();
  }, [location]);

  return (
    <>
      <div className="mx-auto flex h-screen w-full items-stretch">
        <header className="">
          <LeftPanel />
        </header>
        <main className="flex w-full flex-col">
          <Header />

          <section className="flex flex-grow flex-col px-2 py-2">
            <Routes>
              <Route index element={<FlowCharts />} />
              <Route path="create-flowchart" element={<FlowChartBoard />} />
              <Route path="knowledgebase" element={<KnowledgeBase />} />
              <Route path="bots" element={<Bots />} />
              <Route path="leads" element={<Leads />} />
              <Route path="user-profile" element={<UserProfileSettings />}>
                <Route index element={<AccountSettings />} />
                <Route path="account-settings" element={<AccountSettings />} />
                <Route path="security-settings" element={<SecuritySettings />} />
                <Route path="payment-settings" element={<PaymentSettings />} />
              </Route>
            </Routes>
          </section>
        </main>
      </div>
    </>
  );
}

function UserSpecificRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<FlowCharts />} />
        <Route path="create-flowchart?:flow" element={<FlowChartBoard />} />
        <Route path="knowledgebase" element={<KnowledgeBase />} />
        <Route path="leads" element={<Leads />} />
      </Routes>
    </>
  );
}

export default App;
