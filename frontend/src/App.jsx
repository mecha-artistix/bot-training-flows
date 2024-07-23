import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
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

const register_path = '/sign-in';
const singIn_path = 'sign-in';
const singUp_path = 'register';
function App() {
  const { user } = useAuth();

  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
          <Routes>
            <Route path={singIn_path} element={<UserLoginRegister />}>
              <Route index element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>
            <Route path="*" element={<AuthenticatedApp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

function AuthenticatedApp() {
  const { user } = useAuth();
  console.log(user);
  // if (!isAuthenticated) return <Navigate to={singIn_path} />;
  if (!user.isAuthenticated) return <Navigate to={singIn_path} />;

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
              {/* <Route path={`/`} element={<UserSpecificRoutes />} /> */}
              <Route index element={<FlowCharts />} />
              <Route path="create-flowchart" element={<FlowChartBoard />} />
              <Route path="knowledgebase" element={<KnowledgeBase />} />
              <Route path="bots" element={<Bots />} />
              <Route path="leads" element={<Leads />} />
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
