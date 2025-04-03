// src/components/EventCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './EventCalendar.css';

const EventCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all events from your back end using environment variable
  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get_all_events.php`);
      const data = await response.json();

      if (data.success) {
        // Transform events for FullCalendar
        const events = data.events.map(evt => ({
          id: evt.id,
          title: evt.title,
          start: evt.event_date, // Must be an ISO string
          extendedProps: {
            description: evt.description,
            location: evt.location
          }
        }));
        setCalendarEvents(events);
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  if (loading) {
    return <p className="calendar-loading">Loading calendar...</p>;
  }
  if (error) {
    return <p className="calendar-error">{error}</p>;
  }

  return (
    <div className="event-calendar">
      <h1>Event Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={(info) => {
          // Example: navigate to details
          window.location.href = `/event/${info.event.id}`;
        }}
        eventDidMount={(info) => {
          // A palette of vibrant colors
          const colors = [
            '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9',
            '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2',
            '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3',
            '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC'
          ];
          // Pick a random background color
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          // Apply styling to the event element
          info.el.style.backgroundColor = randomColor;
          info.el.style.border = '1px solid #fff';
          info.el.style.color = '#333';
          info.el.style.borderRadius = '4px';
          info.el.style.padding = '2px 4px';
          info.el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

          // On hover, scale up and add a shadow
          info.el.addEventListener('mouseover', () => {
            info.el.style.transform = 'scale(1.08)';
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
