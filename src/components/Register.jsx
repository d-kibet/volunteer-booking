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
    adminCode: ''  // Optional admin code field
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        // Automatically log the user in using the returned user data
        login(data.user);
        // Redirect to home page after a brief delay
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
      <h1>Register</h1>
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
        
        <button type="submit">Register</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
};

export default Register;
