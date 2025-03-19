// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <p>This is a protected route that requires user authentication.</p>
    </div>
  );
};

export default Dashboard;
