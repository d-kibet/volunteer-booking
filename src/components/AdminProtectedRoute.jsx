// src/components/AdminProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // If no user or the user's role is not 'admin', redirect them away
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
