import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Updates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/updates');
        setUpdates(res.data);
      } catch (error) {
        console.error('Failed to fetch updates');
      }
    };
    fetchUpdates();
  }, []);

  return (
    <div style={{ padding: '50px 20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Latest Updates</h2>
      <ul>
        {updates.map((update) => (
          <li key={update.id} style={{ marginBottom: '15px' }}>
            <strong>{update.title}</strong> - {update.content} <br />
            <small>{new Date(update.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Updates;