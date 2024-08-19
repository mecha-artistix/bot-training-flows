import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import RobotFace from '../assets/images/bot_icon.svg';
import { useState } from 'react';
import { forgotPassword, resetPassword } from './resetPassword';
import { useAuth } from '../context/AuthContext';
function PasswordReset() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const targetSegment = pathSegments.includes('forget-password') ? 'resetPassword' : null;

  return (
    <section className="flex flex-col h-screen items-center justify-center space-y-[15vh]">
      <div className="flex items-center space-x-2">
        <img src={RobotFace} />
        <div className="flex flex-col justify-between">
          <h2 className="font-theme_logo">{import.meta.env.VITE_SITE_NAME}</h2>
          <p className="tracking-[.6rem] text-accent">24/7 at Your Service!</p>
        </div>
      </div>
      <div className="lg:w-[600px]">
        <Outlet />
      </div>
    </section>
  );
}

export default PasswordReset;

export function EnterEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setEmail(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword(email);
    if (result.error) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };
  return (
    <div className="flex flex-col space-y-7">
      <h2 className="text-3xl font-bold">Enter your email to receive Password Reset Token</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="email" hidden>
            Email
          </label>
          <input
            className="rounded border p-2 text-base placeholder-gray-400 focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <button className="cwu_form_btn" type="submit">
          Submit
        </button>
      </form>
      {<p>{message}</p>}
    </div>
  );
}

export function ConfirmPassword() {
  const { authenticate } = useAuth();
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const [creds, setCreds] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [message, setMessage] = useState('');
  const token = pathSegments[pathSegments.length - 1];
  const navigete = useNavigate();
  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(token, creds);
    console.log(result);
    if (result.status == 201) {
      authenticate(result.data.user.username, result.data.user._id);
      // setTimeout(() => {
      //   setMessage('password changed! you will be redirected to app');
      // }, 3000);
      navigete('/');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div>
      <h2 className="text-xl">Set up your new password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="password" hidden>
            Password
          </label>
          <input
            className="rounded border p-2 text-base placeholder-gray-400 focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={creds.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="passwordConfirm" hidden>
            Confirm Password
          </label>
          <input
            className="rounded border p-2 text-base placeholder-gray-400 focus:outline-none"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Confirm Your Password"
            value={creds.passwordConfirm}
            onChange={handleChange}
          />
        </div>

        <button className="cwu_form_btn" type="submit">
          Submit
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}
