import { useEffect, useState, createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
// import verifyToken from './verifyToken';
import Cookies from 'js-cookie';

const AuthContext = createContext();
const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';
// const USERS_API = process.env.REACT_APP_API_URL;

// const initState = { status: true, username: 'huzaifa' };
const initState = { isAuthenticated: false, username: null, userId: null };
// Cookies.set('token', action.token, { expires: action.rememberMe ? 7 : undefined }
function reducer(state, action) {
  switch (action.type) {
    case 'success':
      console.log('payload', action.payload);
      Cookies.set('bearer_token', action.payload.token);
      return { ...state, isAuthenticated: true, username: action.payload.username, userId: action.payload.userId };
    case 'failed':
      return initState;
    case 'varified':
      return { ...state, isAuthenticated: true, username: action.payload.username, userId: action.payload.userId };
    case 'logout':
      localStorage.clear();
      Cookies.remove('bearer_token');
      return initState;
    default:
      state;
  }
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initState);
  const token = Cookies.get('bearer_token');

  // Login
  const login = async (creds) => {
    try {
      const response = await fetch(USERS_API + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      if (!response.ok) throw new Error('response not ok');
      const data = await response.json();
      const user = data.data.user;
      if (response.status === 200) {
        console.log(data);
        dispatch({ type: 'success', payload: { token: data.token, username: user.username, userId: user._id } });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };
  // Register
  const register = async (creds) => {
    try {
      const response = await fetch(USERS_API + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      const data = await response.json();
      const user = await data.data.user;
      console.log(data);
      if (response.status === 201) {
        dispatch({ type: 'success', payload: { username: user.username, token: data.token } });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to create: ', error);
    }
  };

  // VERIFY TOKE

  useEffect(() => {
    const verifyToken = async function (token) {
      try {
        const response = await fetch(USERS_API + '/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        // console.log(data);
        const user = data.user;
        if (data.valid) {
          dispatch({ type: 'success', payload: { username: user.username, userId: user._id, token: token } });
        }
        return response.data.user;
      } catch (error) {
        return false;
      }
    };
    verifyToken(token);
  }, []);

  // LOGOUT
  const logout = () => {
    dispatch({ type: 'logout' });
  };

  const value = { login, logout, register, user }; // , user, logout
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
