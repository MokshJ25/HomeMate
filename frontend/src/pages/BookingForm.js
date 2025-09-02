import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const location = useLocation();
  const selectedCategory = location.state?.category || '';

  const [formData, setFormData] = useState({
    service: selectedCategory,
    genderPreference: 'Any',
    duration: 'Day',
    preferredTime: '',
    specialRequests: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/bookings', formData, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Booking successful!');
    } catch (error) {
      setMessage('Booking failed. Please login or try again.');
    }
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Book Your Service</h2>
      <form onSubmit={handleSubmit}>
        <label>Service:</label>
        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="Cleaning">Cleaning</option>
          <option value="Cooking">Cooking</option>
          <option value="Babysitting">Babysitting</option>
          <option value="Elderly Care">Elderly Care</option>
        </select>

        <label>Gender Preference:</label>
        <select name="genderPreference" value={formData.genderPreference} onChange={handleChange}>
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Duration:</label>
        <select name="duration" value={formData.duration} onChange={handleChange}>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>

        <label>Preferred Time:</label>
        <input
          type="datetime-local"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          required
        />

        <label>Special Requests:</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any special instructions?"
        />

        <button type="submit" className="btn" style={{ marginTop: '20px' }}>
          Submit Booking
        </button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default BookingForm;