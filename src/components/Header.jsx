// src/components/Header.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // For keyboard accessibility on the hamburger
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      toggleMenu();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Uplift</div>

        {/* Hamburger icon for mobile */}
        <div
          className="hamburger"
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex="0"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          &#9776;
        </div>

        {/* Navigation menu */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {/* Optional close button on mobile */}
          {menuOpen && (
            <button
              className="nav-close"
              onClick={toggleMenu}
              aria-label="Close navigation"
            >
              &times;
            </button>
          )}

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                  <Link to="/admin/statistics" onClick={() => setMenuOpen(false)}>Statistics</Link>
                </>
              )}
              <Link to="/calendar" onClick={() => setMenuOpen(false)}>Calendar</Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
          <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
