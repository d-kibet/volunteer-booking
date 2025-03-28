// src/components/Home.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Updated get started function that triggers modal if user is not logged in
  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate('/login');
  };

  const handleRegister = () => {
    setShowModal(false);
    navigate('/register');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <Hero onGetStarted={handleGetStarted} />
      
      <div className="features-section">
        {/* ...existing features section code if any */}
      </div>

      <About />
      <Contact />

      {/* Modal Popup for Get Started */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Welcome!</h2>
            <p>Do you already have an account?</p>
            <div className="modal-buttons">
              <button onClick={handleLogin} className="modal-btn">Login</button>
              <button onClick={handleRegister} className="modal-btn">Register</button>
            </div>
            <button className="modal-close" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
