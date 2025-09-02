const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
// const calendarRoutes = require('./routes/calendar');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api', calendarRoutes);
app.post('/api/check-pincode', (req, res) => {
  const metroPincodes = ['110001', '400001', '560001', '600001', '700001'];
  if (metroPincodes.includes(req.body.pincode)) {
    res.json({ available: true, message: 'Service available in your area' });
  } else {
    res.json({ available: false, message: 'Service not yet available in your area' });
  }
});
app.get('/api/packages', (req, res) => {
  const packages = [
    { id: 1, name: 'Day', price: 500, discount: 0, description: 'Basic daily cleaning' },
    { id: 2, name: 'Month', price: 15000, discount: 5, description: 'Monthly comprehensive services' },
    { id: 3, name: 'Quarter', price: 40000, discount: 10, description: 'Quarterly package' },
    { id: 4, name: 'Half Year', price: 75000, discount: 15, description: 'Half-year support' },
    { id: 5, name: 'Full Year', price: 140000, discount: 20, description: 'Full-year support' }
  ];
  res.json(packages);
});
app.get('/api/updates', (req, res) => {
  const updates = [
    { id: 1, title: 'New Discount', content: 'Monthly package now with 5% off', date: new Date().toISOString() },
    { id: 2, title: 'Maid Assigned', content: 'Maid assigned to your booking', date: new Date(Date.now() - 86400000).toISOString() }
  ];
  res.json(updates);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));