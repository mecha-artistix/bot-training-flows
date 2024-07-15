import { useEffect, useState, createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const USERS_API = import.meta.env.VITE_NODE_BASE_API + 'users';
// const USERS_API = process.env.REACT_APP_API_URL;

// const initState = { status: true, username: 'huzaifa' };
const initState = { status: false, username: null, userID: null };

function reducer(state, action) {
  switch (action.type) {
    case 'success':
      localStorage.setItem('userID', action.payload.userID);
      console.log('payload', action.payload);
      return { ...state, status: true, username: action.payload.username, userID: action.payload.userID };
    case 'failed':
      return initState;
    case 'logout':
      localStorage.clear();
      return initState;
    default:
      state;
  }
}

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initState);

  const [isAuthenticated, setIsAuthenticated] = useState();
  const [response, setResponse] = useState();
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
      const resData = await response.json();
      const data = resData.data;
      if (response.status === 200) {
        dispatch({ type: 'success', payload: { username: data.username, userID: data.userID } });
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
      const response = await fetch(USERS_API + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      const resData = await response.json();
      const data = resData.data;
      if (response.status === 201) {
        dispatch({ type: 'success', payload: { username: data.username, userID: data.userID } });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to create: ', error);
    }
  };

  const logout = () => {
    dispatch({ type: 'logout' });
  };

  const value = { login, logout, register, user }; // , user, logout
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
