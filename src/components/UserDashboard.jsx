// src/components/UserDashboard.jsx
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Wrap fetchRegistrations in useCallback so it's stable as a dependency
  const fetchRegistrations = useCallback(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch('http://localhost/volunteer-api/get_user_registrations.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRegistrations(data.registrations);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching your registrations.');
        setLoading(false);
      });
  }, [user]);

  // Now use fetchRegistrations as a dependency
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Function to cancel a booking
  const handleCancelBooking = async (eventId) => {
    try {
      const response = await fetch('http://localhost/volunteer-api/cancel_registration.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, event_id: eventId })
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  if (!user) {
    return <p style={{ padding: '20px' }}>Please log in to view your dashboard.</p>;
  }

  if (loading) {
    return <p style={{ padding: '20px' }}>Loading your events...</p>;
  }

  return (
    <div className="user-dashboard">
      <h1>{user.first_name} {user.last_name}'s Dashboard</h1>
      <h2>Your Registered Events</h2>
      {message && <p className="dashboard-message">{message}</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {registrations.length === 0 ? (
        <p>You haven't booked any events yet.</p>
      ) : (
        registrations.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
            </p>
            {event.location && <p><strong>Location:</strong> {event.location}</p>}
            {event.image && <img src={event.image} alt={event.title} />}
            <button className="btn-cancel" onClick={() => handleCancelBooking(event.id)}>
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDashboard;
