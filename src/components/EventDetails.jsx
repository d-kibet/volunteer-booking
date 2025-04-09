// src/components/EventDetails.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import AddToCalendar from './AddToCalendar';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams(); // Get event id from URL
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchEventDetails = () => {
    fetch(`${process.env.REACT_APP_API_URL}/get_events.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setEvent(data.event);
          setAvgRating(data.avg_rating);
          setComments(data.comments);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching event details:', err);
        setError('Error fetching event details.');
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("API URL:", process.env.REACT_APP_API_URL);
    fetchEventDetails();
  }, [id]);

  // Determine if the event has ended (only after the event_date has passed)
  const eventHasEnded = event && new Date(event.event_date) < new Date();

  // Handle event booking
  const handleBookEvent = async () => {
    if (!user) {
      setBookingMessage('Please log in to book this event.');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/book_event.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, event_id: event.id })
      });
      const data = await response.json();
      setBookingMessage(data.message);
    } catch (error) {
      console.error('Booking error:', error);
      setBookingMessage('Error connecting to the server.');
    }
  };

  // Handle rating submission (allows updates)
  const handleSubmitRating = async () => {
    if (!user) {
      setFeedbackMsg('Please log in to submit a rating.');
      return;
    }
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setFeedbackMsg('Rating must be between 1 and 5.');
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/submit_rating.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: event.id,
          user_id: user.id,
          rating: parsedRating,
          comment: feedback
        })
      });
      const data = await response.json();
      setFeedbackMsg(data.message);
      if (data.success) {
        fetchEventDetails();
        setRating('');
        setFeedback('');
      }
    } catch (error) {
      console.error('Rating submission error:', error);
      setFeedbackMsg('Error submitting rating.');
    }
  };

  if (loading) {
    return <p className="loading">Loading event details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!event) {
    return <p className="error">Event not found.</p>;
  }

  return (
    <div className="event-details">
      <Link to="/events" className="back-link">&larr; Back to Events</Link>
      
      <div className="details-section">
        <h1 className="event-title">{event.title}</h1>
        {event.image && <img className="event-image" src={event.image} alt={event.title} />}
        <p className="event-description">{event.description}</p>
        <p className="event-date">
          <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
        </p>
        {event.location && (
          <p className="event-location"><strong>Location:</strong> {event.location}</p>
        )}
        <button className="btn-book" onClick={handleBookEvent}>Book Now</button>
        {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
      </div>
      
      <hr className="divider" />
      
      <div className="rating-section">
        {eventHasEnded ? (
          <>
            <h2>Event Rating & Feedback</h2>
            {avgRating !== null && (
              <p className="avg-rating">Average Rating: {avgRating} / 5</p>
            )}
            <div className="rating-form">
              <p className="note">
                Note: Submitting your rating again will update your previous feedback.
              </p>
              <label htmlFor="rating">Your Rating (1-5):</label>
              <input 
                type="number" 
                id="rating" 
                value={rating} 
                onChange={(e) => setRating(e.target.value)} 
                min="1" 
                max="5" 
              />
              <label htmlFor="feedback">Your Feedback (optional):</label>
              <textarea 
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Leave a comment..."
              />
              <button className="btn-submit-rating" onClick={handleSubmitRating}>Submit Rating</button>
              {feedbackMsg && <p className="feedback-message">{feedbackMsg}</p>}
            </div>
            <div className="comments-section">
              <h3>Feedback from Others</h3>
              {comments && comments.length > 0 ? (
                comments.map((c, index) => (
                  <div key={index} className="comment">
                    <p><strong>{c.user_name}</strong> rated {c.rating} stars</p>
                    {c.comment && <p>{c.comment}</p>}
                    <hr />
                  </div>
                ))
              ) : (
                <p>No feedback yet.</p>
              )}
            </div>
          </>
        ) : (
          <div className="rating-section">
            <h2>Event Rating & Feedback</h2>
            <p className="info-message">Ratings and feedback will be available after the event ends.</p>
          </div>
        )}
      </div>

      {/* Add to Calendar Section */}
      <AddToCalendar event={event} />
    </div>
  );
};

export default EventDetails;
