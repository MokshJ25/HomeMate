import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <nav className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">HomeMate</Link>
        <div className="space-x-4">
          <Link to="/check-location" className="hover:underline">Find Maid</Link>
          <Link to="/packages" className="hover:underline">Packages</Link>
          <Link to="/updates" className="hover:underline">Updates</Link>
          <Link to="/calendar" className="hover:underline">Calendar</Link>
        </div>
      </div>
    </nav>
  );
}
