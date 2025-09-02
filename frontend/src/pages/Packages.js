import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (error) {
        console.error('Failed to fetch packages');
      }
    };
    fetchPackages();
  }, []);

  return (
    <div style={{ padding: '50px 20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Our Packages</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
        {packages.map((pkg) => (
          <div key={pkg.id} className="card" style={{ flex: '1 1 250px' }}>
            <h3>{pkg.name} Package</h3>
            <p>Price: ₹{pkg.price}</p>
            {pkg.discount > 0 && <p>Discount: {pkg.discount}%</p>}
            <p>{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;