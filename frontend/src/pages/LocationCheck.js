import React, { useState } from 'react';
import axios from 'axios';

export default function LocationCheck(){
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const check = async () => {
    if(!/^\d{6}$/.test(pincode)) return alert('Enter a 6-digit pincode');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/pincodes/check/${pincode}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Error checking pincode');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Check Service Availability</h1>
      <div className="max-w-md">
        <input value={pincode} onChange={e=>setPincode(e.target.value)} placeholder="Enter pincode"
          className="w-full p-3 rounded-lg shadow" />
        <button onClick={check} className="mt-3 px-4 py-2 rounded bg-indigo-600 text-white">Check</button>

        {result && (
          <div className="mt-4 p-3 rounded bg-gray-50">
            {result.available
              ? <div>Great — services available in <b>{result.city}</b></div>
              : <div>Sorry — services not available in this pincode yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
