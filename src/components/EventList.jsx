// src/components/EventList.jsx
import React, { useState, useEffect } from 'react';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search/filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [anyDate, setAnyDate] = useState('Any Date');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost/volunteer-api/get_events.php');
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Derive filtered events
  const filteredEvents = events.filter((event) => {
    // text search in title or description
    const searchMatch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    // category match
    const categoryMatch =
      category === 'All Categories' || event.category === category;

    // date filter
    let dateMatch = true;
    const eventDate = new Date(event.event_date);
    const now = new Date();

    if (anyDate === 'This Week') {
      const weekLater = new Date();
      weekLater.setDate(now.getDate() + 7);
      dateMatch = eventDate >= now && eventDate <= weekLater;
    } else if (anyDate === 'This Month') {
      dateMatch =
        eventDate.getMonth() === now.getMonth() &&
        eventDate.getFullYear() === now.getFullYear();
    } else if (anyDate === 'Next Month') {
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const monthAfterNext = new Date(now.getFullYear(), now.getMonth() + 2, 1);
      dateMatch = eventDate >= nextMonth && eventDate < monthAfterNext;
    }

    return searchMatch && categoryMatch && dateMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Click handlers
  const handleImageClick = (id) => {
    window.location.href = `/event/${id}`;
  };

  const handleBookNow = (id) => {
    // Navigate to details or booking page
    window.location.href = `/event/${id}`;
  };

  if (loading) {
    return <p className="loading">Loading events...</p>;
  }
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="events-page">
      <h1>Volunteer Opportunities</h1>
      <p>Find and join volunteering opportunities in your community</p>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Categories</option>
          <option>Outdoor</option>
          <option>Community</option>
          <option>Education</option>
          <option>Health</option>
        </select>

        <select
          value={anyDate}
          onChange={(e) => {
            setAnyDate(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>Any Date</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>Next Month</option>
        </select>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid-container">
        {currentEvents.map((event) => (
          <div key={event.id} className="grid-item">
           
            <h2 className="event-title">{event.title}</h2>
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
                onClick={() => handleImageClick(event.id)}
              />
            )}
            <p className="event-description">{event.description}</p>
            <p className="event-date">
              <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
            </p>
            <p className="event-location">
              <strong>Location:</strong> {event.location}
            </p>
            <button className="btn-book" onClick={() => handleBookNow(event.id)}>Book Now</button>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === currentPage ? 'active-page' : ''}
              >
                {page}
              </button>
            );
          })}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default EventList;
