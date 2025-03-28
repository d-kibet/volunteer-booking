// src/components/UserProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user ? user.first_name : '');
  const [lastName, setLastName] = useState(user ? user.last_name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState(''); // New password field
  const [message, setMessage] = useState('');

  // Update form fields when the user changes
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost/volunteer-api/update_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          email,
          password  // Send password (can be empty string if unchanged)
        })
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        // Update the auth context with new user data
        const updatedUser = { ...user, first_name: firstName, last_name: lastName, email };
        login(updatedUser);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile');
    }
  };

  if (!user) {
    return <p className="profile-message">Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-heading">Your Profile</h1>
        <p className="profile-subheading">Update your details below</p>

        <form onSubmit={handleSubmit} className="profile-form">
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
          
          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />

          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label>New Password (leave blank to keep current password):</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit" className="btn-primary">Update Profile</button>
        </form>

        {message && <p className="profile-message">{message}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
