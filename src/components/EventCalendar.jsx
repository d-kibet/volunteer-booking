// src/components/EventCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './EventCalendar.css';

const EventCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllEvents = async () => {
    try {
      const res = await fetch('http://localhost/volunteer-api/get_all_events.php');
      const data = await res.json();
      if (data.success) {
        // Transform events to FullCalendar's format
        const events = data.events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.event_date, // Ensure event_date is in ISO format
          extendedProps: {
            description: event.description,
            location: event.location
          }
        }));
        setCalendarEvents(events);
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
    fetchAllEvents();
  }, []);

  if (loading) {
    return <p className="loading">Loading calendar...</p>;
  }
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="event-calendar">
      <h1>Event Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={(info) => {
          // Navigate to event details page when an event is clicked
          window.location.href = `/event/${info.event.id}`;
        }}
        eventDidMount={(info) => {
          // Define a palette of colors
          const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', '#FFE0B2', '#D7CCC8'];
          // Pick a random color from the palette
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          info.el.style.backgroundColor = randomColor;
          info.el.style.border = '1px solid #fff';
          // Add transition for smooth animation
          info.el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          // Add hover effect: scale up and add shadow
          info.el.addEventListener('mouseover', () => {
            info.el.style.transform = 'scale(1.05)';
            info.el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
          });
          info.el.addEventListener('mouseout', () => {
            info.el.style.transform = 'scale(1)';
            info.el.style.boxShadow = 'none';
          });
        }}
      />
    </div>
  );
};

export default EventCalendar;
