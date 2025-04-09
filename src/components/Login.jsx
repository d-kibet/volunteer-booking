// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import SocialLogin from './SocialLogin'; // If you have social logins, keep this import
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle normal login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Error connecting to the server.');
    }
  };

  // Handle successful social login
  const handleSocialLoginSuccess = async (provider, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/social_login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, token }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Social login error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  // Handle social login failure
  const handleSocialLoginFailure = (provider, response) => {
    setMessage(`Social login with ${provider} failed.`);
  };

  // Handle text field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-heading">Login</h1>
        <p className="login-subheading">Access your account to continue volunteering!</p>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          
          <button type="submit" className="btn-primary">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        {/* Social Login Buttons (If applicable) */}
        <div className="social-login-section">
          {/* If you have social logins: */}
          <SocialLogin 
            onSocialLoginSuccess={handleSocialLoginSuccess} 
            onSocialLoginFailure={handleSocialLoginFailure} 
          />
        </div>
        
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
