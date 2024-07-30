import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState();
  // const { re_enter_password, ...registerCred } = creds;
  useEffect(() => {
    if (user.isAuthenticated) {
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
      if (!user.isAuthenticated) {
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
          <label className="mb-2 font-bold" htmlFor="firstName" hidden>
            firstName
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={creds.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="lastName" hidden>
            lastName
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={creds.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="username" hidden>
            Username
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={creds.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="email" hidden>
            Email
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
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
        <div className="mb-2 flex flex-col py-2">
          <label className="mb-2 font-bold" htmlFor="re_enter_password" hidden>
            re_enter_password
          </label>
          <input
            className={`rounded border p-2 text-base placeholder-gray-400 focus:outline-none ${
              error ? 'border-red-500' : ''
            }`}
            type="password"
            id="re_enter_password"
            name="passwordConfirm"
            placeholder="Re_enter Password"
            value={creds.passwordConfirm}
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
