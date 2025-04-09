// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    event_date: '',
    location: '',
    image: ''
  });
  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/get_events.php?all=1&_=${Date.now()}`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      } else {
        setMessage('Failed to load events.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error fetching events.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle creating a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create_event.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        setFormData({ title: '', description: '', event_date: '', location: '', image: '' });
        fetchEvents();
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server.');
    }
  };

  // Handle deletion of an event
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete_event.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eventId })
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        fetchEvents();
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server.');
    }
  };

  // Initiate editing: load the event data into the form and hide create form
  const handleEditInitiation = (event) => {
    setEditingEvent(event.id);
    setFormData({
      id: event.id,
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location || '',
      image: event.image || ''
    });
  };

  // Handle updating an event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update_event.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        setEditingEvent(null);
        setFormData({ title: '', description: '', event_date: '', location: '', image: '' });
        fetchEvents();
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {message && <p className="message">{message}</p>}
      <div className="admin-container">
        <div className="form-section">
          {editingEvent ? (
            <>
              <h2>Edit Event</h2>
              <form onSubmit={handleUpdateEvent} className="event-form">
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                <label>Event Date:</label>
                <input type="datetime-local" name="event_date" value={formData.event_date} onChange={handleChange} required />
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                <label>Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
                <button type="submit">Update Event</button>
                <button type="button" onClick={() => {
                  setEditingEvent(null);
                  setFormData({ title: '', description: '', event_date: '', location: '', image: '' });
                }}>Cancel Edit</button>
              </form>
            </>
          ) : (
            <>
              <h2>Create New Event</h2>
              <form onSubmit={handleCreateEvent} className="event-form">
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                <label>Event Date:</label>
                <input type="datetime-local" name="event_date" value={formData.event_date} onChange={handleChange} required />
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
                <label>Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />
                <button type="submit">Create Event</button>
              </form>
            </>
          )}
        </div>
        <div className="list-section">
          <h2>Existing Events</h2>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.event_date).toLocaleString()}</p>
                {event.location && <p><strong>Location:</strong> {event.location}</p>}
                {event.image && <img src={event.image} alt={event.title} />}
                <div className="admin-actions">
                  <button onClick={() => handleEditInitiation(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
