import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Remove the direct import of LanguageContext since it's used within App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);