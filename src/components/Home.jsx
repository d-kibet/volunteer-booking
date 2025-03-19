// src/components/Home.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Minimal logic for "Get Started"
  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, go to dashboard
      navigate('/dashboard');
    } else {
      // If not, confirm whether they have an account
      const hasAccount = window.confirm(
        "Do you already have an account?\n\nOK → Login\nCancel → Register"
      );
      if (hasAccount) {
        navigate('/login');
      } else {
        navigate('/register');
      }
    }
  };

  return (
    <div className="home">    
    
      {/* ========== SECONDARY SECTION ========== */}
      <div className="secondary-section">
        <h2>Empower Your Community</h2>
        <p>Join us in making a difference by volunteering your time and skills.</p>
        <button className="secondary-btn">Become a Volunteer</button>
      </div>

      {/* ========== BULLET POINTS / FEATURES SECTION ========== */}
      <div className="features-section">
        <div className="feature-item">
          <h3>Easy Booking</h3>
          <p>Simple and streamlined process to book volunteering opportunities.</p>
        </div>
        <div className="feature-item">
          <h3>Real-Time Updates</h3>
          <p>Stay informed with instant notifications and updates.</p>
        </div>
        <div className="feature-item">
          <h3>Community Engagement</h3>
          <p>Connect with organizations and fellow volunteers.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
