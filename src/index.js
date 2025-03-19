// src/index.js
import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
