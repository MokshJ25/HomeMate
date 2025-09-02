import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header style={{ padding: '10px', backgroundColor: '#1976d2', color: 'white' }}>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/location" style={{ color: 'white', textDecoration: 'none' }}>Location Check</Link>
        <Link to="/category" style={{ color: 'white', textDecoration: 'none' }}>Category</Link>
        <Link to="/booking" style={{ color: 'white', textDecoration: 'none' }}>Booking</Link>
        <Link to="/packages" style={{ color: 'white', textDecoration: 'none' }}>Packages</Link>
        <Link to="/updates" style={{ color: 'white', textDecoration: 'none' }}>Updates</Link>
        <Link to="/calendar" style={{ color: 'white', textDecoration: 'none' }}>Calendar</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        <Link to="/customer-service" style={{ color: 'white', textDecoration: 'none' }}>Customer Service</Link>
      </nav>
    </header>
  );
};
export default Header;