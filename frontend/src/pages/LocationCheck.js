import React, { useState } from 'react';
import axios from 'axios';

const LocationCheck = () => {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');

  const checkService = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/check-pincode', { pincode });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Error checking service availability');
    }
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Check Service Availability</h2>
      <input
        type="text"
        placeholder="Enter your pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <button className="btn" onClick={checkService} style={{ marginTop: '15px' }}>
        Check
      </button>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default LocationCheck;