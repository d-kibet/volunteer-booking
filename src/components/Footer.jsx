import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        <div className="get-in-touch">
          <h2>Get in touch</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:02037805870">020 3780 5870</a>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:info@volunteeringmatters.org.uk">info@upliftsupport.com</a>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <address>The Levy Centre, 18-24 Lower Clapton Road, London, E5 0PD</address>
            </div>
          </div>
          
          <div className="social-container">
            <h3>Connect with us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Twitter" className="social-icon"><FaTwitter /></a>
              <a href="#" aria-label="Instagram" className="social-icon"><FaInstagram /></a>
              <a href="#" aria-label="Facebook" className="social-icon"><FaFacebook /></a>
              <a href="#" aria-label="LinkedIn" className="social-icon"><FaLinkedin /></a>
              <a href="#" aria-label="YouTube" className="social-icon"><FaYoutube /></a>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="primary-button">Volunteer with us</button>
            <button className="secondary-button">Find opportunities near you</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-info">
          <div className="copyright">
            <p>© 2025 Uplift Volunteering.</p>
            <p className="legal-text">Uplift Volunteering is a registered charity in Nigeria. Uplift Volunteering is a company limited by guarantee no. 9036387.</p>
          </div>
          
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Cookie Policy</a>
            <a href="#" className="footer-link">Work for us</a>
          </div>
        </div>
        
        <div className="footer-badges">
          <img src="/path-to-power-of-youth-charter.png" alt="Power of Youth Charter" className="footer-badge" />
          <img src="/path-to-accessibility-icon.png" alt="Accessibility" className="footer-badge" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;