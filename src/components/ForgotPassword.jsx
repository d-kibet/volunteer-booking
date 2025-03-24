// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost/volunteer-api/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message || 'Check your email for a reset link.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <button type="submit" className="btn-primary">Send Reset Link</button>
        </form>
        {message && <p className="forgot-password-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
