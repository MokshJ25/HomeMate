import React, { useState } from 'react';

const CustomerService = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate sending message
    setResponse('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Customer Service</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />
        <button type="submit" className="btn" style={{ marginTop: '20px' }}>
          Send Message
        </button>
      </form>
      {response && <p style={{ marginTop: '20px' }}>{response}</p>}
    </div>
  );
};

export default CustomerService;