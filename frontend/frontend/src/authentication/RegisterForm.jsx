import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState();

  useEffect(() => {
    if (user.status) {
      navigate('/');
    }
  }, [user, navigate]);

  function handleChange(e) {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(creds);
      if (!user.status) {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold text-white" htmlFor="username">
            Username
          </label>
          <input
            className={`rounded border p-2 text-base  placeholder-gray-400 focus:outline-none  ${
              error ? 'border-red-500' : ''
            }`}
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={creds.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold text-white" htmlFor="username">
            Email
          </label>
          <input
            className={`rounded border p-2 text-base  placeholder-gray-400 focus:outline-none  ${
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
          <label className="mb-2 font-bold text-white" htmlFor="password">
            Password
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none  ${
              error ? 'border-red-500' : ''
            }`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={creds.password}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <input className="cwu_form_btn" type="submit" value="Register" />
      </form>
    </>
  );
}

export default RegisterForm;
