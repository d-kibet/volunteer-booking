// src/components/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Volunteer Platform</h1>
        <p>Empowering communities through service and engagement.</p>
        <button className="hero-btn" onClick={onGetStarted}>
         Become A Volunteer
        </button>
      </div>
    </section>
  );
};

export default Hero;
