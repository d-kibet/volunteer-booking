// src/components/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual endpoint if needed
      const res = await fetch("http://localhost/volunteer-api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResponseMsg(data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact error:", error);
      setResponseMsg("Error connecting to server.");
    }
  };

  return (
    <div className="contact-section" id="contact">
      <h1>Contact Us</h1>
      <p>If you have any inquiries or need more information, please fill out the form below.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <label>Message:</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Send Message</button>
      </form>
      {responseMsg && <p className="contact-response">{responseMsg}</p>}
    </div>
  );
};

export default Contact;
