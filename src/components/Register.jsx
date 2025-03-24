// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    adminCode: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Social sign up placeholders
  const handleGoogleSignUp = () => {
    console.log('Google sign-up not yet implemented.');
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign-up not yet implemented.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/volunteer-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        // Auto-login
        login(data.user);
        // Redirect
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-heading">Register</h1>
        <p className="register-subheading">Create your account and start volunteering!</p>

        <form onSubmit={handleSubmit} className="register-form">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          
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
          
          <label>Admin Code (optional):</label>
          <input 
            type="text" 
            name="adminCode" 
            value={formData.adminCode} 
            onChange={handleChange} 
            placeholder="Enter admin code if applicable"
          />
          
          <button type="submit" className="btn-primary">Register</button>
        </form>

        {message && <p className="register-message">{message}</p>}

        <div className="social-register">
          <p>Or sign up with:</p>
          <button className="google-btn" onClick={handleGoogleSignUp}>Google</button>
          <button className="facebook-btn" onClick={handleFacebookSignUp}>Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
