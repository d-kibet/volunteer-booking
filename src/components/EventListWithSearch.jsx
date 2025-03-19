// src/components/EventListWithSearch.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './EventList.css';

const EventListWithSearch = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext);

  const fetchEvents = async (page, search = '') => {
    setLoading(true);
    try {
      let url = `http://localhost/volunteer-api/get_events.php?page=${page}`;
      if (search.trim() !== '') {
        url += `&search=${encodeURIComponent(search)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        setError('Failed to load events.');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Reset to page 1 when new search is submitted
    setCurrentPage(1);
    fetchEvents(1, searchTerm);
  };

  // Handle booking event
  const handleBookEvent = async (eventId) => {
    if (!user) {
      setMessage('Please log in to book an event.');
      return;
    }
    try {
      const response = await fetch('http://localhost/volunteer-api/book_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, event_id: eventId })
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button className="page-btn" onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <p style={{ padding: '20px' }}>Loading events...</p>;
  }
  if (error) {
    return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;
  }

  return (
    <div className="paginated-event-list">
      <h1>Volunteer Opportunities</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input 
          type="text" 
          placeholder="Search events..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {message && <p style={{ padding: '20px', color: 'green' }}>{message}</p>}
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <div className="grid-container">
          {events.map((event) => (
            <div key={event.id} className="grid-item">
              <span className="opportunity-label">OPPORTUNITY</span>
              <Link to={`/event/${event.id}`} className="event-tile">
                <h2>{event.title}</h2>
                {event.image && <img src={event.image} alt={event.title} />}
              </Link>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
              </p>
              {event.location && (
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              )}
              <button className="btn-book" onClick={() => handleBookEvent(event.id)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
      {renderPagination()}
    </div>
  );
};

export default EventListWithSearch;
