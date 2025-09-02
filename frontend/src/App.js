import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LocationCheck from './pages/LocationCheck';
import CategorySelection from './pages/CategorySelection';
import BookingForm from './pages/BookingForm';
import Packages from './pages/Packages';
import Updates from './pages/Updates';
import CalendarPage from './pages/CalendarPage';
import About from './pages/About';
import CustomerService from './pages/CustomerService';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<LocationCheck />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;