import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ padding: '100px 20px', textAlign: 'center' }}
    >
      <h1>HomeMate</h1>
      <p>Your trusted home service partner – connecting you with verified maids for all your needs.</p>
      <img
        src="/images/workers-animation.gif"
        alt="Animated man and woman working together"
        className="animated-image"
        style={{ maxWidth: '600px', width: '100%', marginTop: '20px' }}
      />
    </motion.div>
  );
};

export default Home;