// src/components/UserProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState(''); // New password field
  const [message, setMessage] = useState('');

  // Update form fields when the user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
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
          name,
          email,
          password  // Send password (it can be an empty string)
        })
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        // Update the auth context with new user data; password is not returned so keep it unchanged.
        const updatedUser = { ...user, name, email };
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
    <div className="user-profile">
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
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
        
        <button type="submit">Update Profile</button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
};

export default UserProfile;
