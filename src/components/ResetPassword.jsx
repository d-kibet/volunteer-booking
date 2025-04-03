// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reset_password.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <h1>Reset Password</h1>
        <p>Enter a new password for your account.</p>
        {message && <p className="reset-password-message">{message}</p>}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label>New Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!token}
          />
          <button type="submit" className="btn-primary" disabled={!token}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
