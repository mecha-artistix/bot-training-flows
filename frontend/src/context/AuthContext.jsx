import { useEffect, useState, createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();
const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';

const initState = { isAuthenticated: false, username: null, userId: null };
function reducer(state, action) {
  switch (action.type) {
    case 'success':
      console.log(document.Cookies);
      return { ...state, isAuthenticated: true, username: action.payload.username, userId: action.payload.userId };
    case 'failed':
      return initState;
    case 'varified':
      return { ...state, isAuthenticated: true, username: action.payload.username, userId: action.payload.userId };
    case 'logout':
      return initState;
    default:
      state;
  }
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initState);

  // Login
  const login = async (creds) => {
    try {
      const response = await fetch(USERS_API + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'response not ok');
      const user = data.data.user;
      if (response.status === 200) {
        dispatch({ type: 'success', payload: { username: user.username, userId: user._id } });
        return { status: response.status };
      }
    } catch (error) {
      return { message: error.message };
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
        dispatch({ type: 'success', payload: { username: user.username } });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to create: ', error);
    }
  };
  const authenticate = (username, userId) => {
    dispatch({ type: 'success', payload: { username: username, userId: userId } });
  };
  // VERIFY TOKE

  const verifyToken = async function () {
    try {
      const response = await fetch(USERS_API + '/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      const user = data.user;
      if (data.valid) {
        dispatch({ type: 'success', payload: { username: user.username, userId: user._id } });
      }
      return response.data.user;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  // LOGOUT
  const logout = async () => {
    try {
      const response = await fetch(USERS_API + '/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error(response);
      dispatch({ type: 'logout' });
    } catch (error) {
      return error;
    }
  };

  const value = { login, logout, register, user, verifyToken, authenticate }; // , user, logout
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
