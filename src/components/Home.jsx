// src/components/Home.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
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
      {/* HERO SECTION */}
      <Hero onGetStarted={handleGetStarted} />

      {/* FEATURES SECTION */}
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

      {/* EMBEDDED ABOUT SECTION */}
      <About />

      {/* EMBEDDED CONTACT SECTION */}
      <Contact />
    </div>
  );
};

export default Home;
