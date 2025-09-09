import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LocationCheck from './pages/LocationCheck';
import CategorySelection from './pages/CategorySelection';
import BookingForm from './pages/BookingForm';
import Packages from './pages/Packages';
import Updates from './pages/Updates';
import CalendarPage from './pages/CalendarPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';

function App(){
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-location" element={<LocationCheck />} />
          <Route path="/select-category" element={<CategorySelection />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
