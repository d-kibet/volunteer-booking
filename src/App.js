// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import AdminStatistics from './components/AdminStatistics';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventCalendar from './components/EventCalendar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Other routes remain unchanged */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/statistics" element={
            <AdminProtectedRoute>
              <AdminStatistics />
            </AdminProtectedRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
