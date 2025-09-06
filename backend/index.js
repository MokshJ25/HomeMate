const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, HomeMate Backend is Running with Database!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
