// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">Volunteer Booking</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin">Admin Dashboard</Link>
                  <Link to="/admin/statistics">Statistics</Link>
                </>
              )}
              {/* Only show calendar link for logged-in users */}
              <Link to="/calendar">Calendar</Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/events">Events</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
