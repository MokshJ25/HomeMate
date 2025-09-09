import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const services = [
    { name: "Cleaning", color: "#FFEDD5" },
    { name: "Cooking", color: "#DBEAFE" },
    { name: "Babysitting", color: "#FCE7F3" },
    { name: "Elderly Care", color: "#DCFCE7" },
    { name: "Other Services", color: "#E0E7FF" },
  ];

  return (
    <div className="home-page font-sans text-gray-800">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to HomeMate
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your trusted partner for hiring reliable maids for all your home needs.
          Cleaning, Cooking, Babysitting, Elderly Care, and much more—right at your
          fingertips.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link
            to="/check-location"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:scale-105 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="services py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              style={{ backgroundColor: service.color }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="h-40 bg-gray-300 flex items-center justify-center">
                {/* Placeholder Box for Image */}
                <span className="text-gray-600 font-semibold">Image</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-center">{service.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="h-64 bg-gray-300 rounded-2xl flex items-center justify-center">
            {/* Placeholder Box for Image */}
            <span className="text-gray-600 font-semibold">Image</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose HomeMate?</h2>
            <p className="text-lg mb-4">
              We make hiring maids simple and reliable. Choose from experienced
              professionals for your specific needs. Flexible packages, transparent
              pricing, and real-time updates—all in one place.
            </p>
            <Link
              to="/about"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by Moksh
        </p>
      </footer>
    </div>
  );
};

export default Home;
