// src/components/AdminStatistics.jsx
import React, { useState, useEffect } from 'react';
import './AdminStatistics.css';

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost/volunteer-api/get_statistics.php');
      const data = await response.json();
      if (data.success) {
        setStats(data);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error fetching statistics.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p className="loading">Loading statistics...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="admin-statistics">
      <h1>Admin Statistics Dashboard</h1>
      <div className="stats-card">
        <p><strong>Total Events:</strong> {stats.totalEvents}</p>
        <p><strong>Total Registrations:</strong> {stats.totalRegistrations}</p>
        <p>
          <strong>Overall Average Rating:</strong> {stats.avgRating !== null ? stats.avgRating : 'No ratings yet'}
        </p>
      </div>
    </div>
  );
};

export default AdminStatistics;
