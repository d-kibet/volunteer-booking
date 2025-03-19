// src/AuthContext.js
import React, { createContext, useState } from 'react';

// Create a context for authentication
export const AuthContext = createContext(null);

// AuthProvider component that wraps your app and provides auth state and methods
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function: store user in state and localStorage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function: remove user from state and localStorage
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
