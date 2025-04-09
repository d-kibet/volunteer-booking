// src/components/AddToCalendar.jsx
import React from 'react';
import './AddToCalendar.css';

const AddToCalendar = ({ event }) => {
  // Use event.event_date; if event.end_date is not provided, default to 2 hours later.
  const startDate = new Date(event.event_date);
  let endDate;
  if (event.end_date) {
    endDate = new Date(event.end_date);
  } else {
    endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
  }

  // Function to format date for Google Calendar: YYYYMMDDTHHmmssZ
  const formatDate = (date) => {
    // toISOString returns "YYYY-MM-DDTHH:MM:SS.sssZ", remove hyphens, colons, and milliseconds
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
  };

  const startStr = formatDate(startDate);
  const endStr = formatDate(endDate);

  // Build Google Calendar link
  const googleLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || '')}&sf=true&output=xml`;

  // Build Outlook link – using Outlook Live URL for composing an event
  const outlookLink = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&startdt=${encodeURIComponent(startDate.toISOString())}&enddt=${encodeURIComponent(endDate.toISOString())}&location=${encodeURIComponent(event.location || '')}`;

  return (
    <div className="add-to-calendar">
      <h3>Add to Calendar</h3>
      <ul>
        <li>
          <a href={googleLink} target="_blank" rel="noopener noreferrer">
            Add to Google Calendar
          </a>
        </li>
        <li>
          <a href={outlookLink} target="_blank" rel="noopener noreferrer">
            Add to Outlook Calendar
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddToCalendar;
