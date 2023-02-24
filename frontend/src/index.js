import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styleSkill.css';
import App from './App';
import { EmpsContextProvider } from './context/EmpsContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EmpsContextProvider>
        <App />
      </EmpsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);