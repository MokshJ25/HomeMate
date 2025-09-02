import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/location">Location Check</NavLink>
      <NavLink to="/category">Category</NavLink>
      <NavLink to="/booking">Booking</NavLink>
      <NavLink to="/packages">Packages</NavLink>
      <NavLink to="/updates">Updates</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/customer-service">Customer Service</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
};

export default Navbar;