import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from './resetPassword';

function LoginForm() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: 'huzaifa@huzaifa.com',
    password: 'huzaifa12345',
  });
  let loginCreds;
  const [error, setError] = useState();

  function handleChange(e) {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(creds);
    if (response.status == 200) {
      navigate(`/`);
      setError('user confirmed');
    } else {
      setError(response.message || 'Login failed. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="username" hidden>
            Email
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={creds.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="password" hidden>
            Password
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={creds.password}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div className="my-3 flex items-center justify-between text-accent">
          <span className="flex space-x-2">
            <input type="checkbox" id="" />
            <p>Remember me</p>
          </span>
          <Link to={`/forget-password`}>Forgot Password?</Link>
          {/* <button onClick={resetPassowrd}>Forgot Password?</button> */}
        </div>
        <input className="cwu_form_btn" type="submit" value="Sign In" />
      </form>
    </>
  );
}

export default LoginForm;
