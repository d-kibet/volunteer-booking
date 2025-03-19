// src/components/Home.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import { AuthContext } from '../AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, go to dashboard
      navigate('/dashboard');
    } else {
      // If not logged in, use a confirm dialog
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
      {/* We remove any direct .hero markup here and only use <Hero> */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Keep your existing About and Contact sections as is */}
      <About />
      <Contact />
    </div>
  );
};

export default Home;
