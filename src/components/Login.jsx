// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // For demonstration only
  const handleGoogleLogin = () => {
    console.log('Google login not yet implemented.');
    // Here you'd integrate Google OAuth or redirect to your server's OAuth endpoint
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login not yet implemented.');
    // Here you'd integrate Facebook OAuth or redirect to your server's OAuth endpoint
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/volunteer-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-heading">Login</h1>
        <p className="login-subheading">Access your account to start volunteering!</p>

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

          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>

          <button type="submit" className="btn-primary">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <div className="social-login">
          <p>Or sign in with:</p>
          <button className="google-btn" onClick={handleGoogleLogin}>Google</button>
          <button className="facebook-btn" onClick={handleFacebookLogin}>Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
