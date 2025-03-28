// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Placeholder functions for social signup
  const handleGoogleSignUp = () => {
    console.log('Google sign-up is not implemented yet.');
    // Integrate Google OAuth here
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign-up is not implemented yet.');
    // Integrate Facebook OAuth here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation: ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost/volunteer-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode
        })
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        // Auto-login user (without password) and redirect
        login(data.user);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-heading">Register</h1>
        <p className="register-subheading">Create your account and start volunteering!</p>
        <form onSubmit={handleSubmit} className="register-form">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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

        {/* Social Sign Up Options */}
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
