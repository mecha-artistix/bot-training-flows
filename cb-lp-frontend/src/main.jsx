import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeProvider } from './context/theme/ColorModeContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </React.StrictMode>
);
