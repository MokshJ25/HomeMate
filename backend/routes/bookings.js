// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Maid = require('../models/Maid');
const { authGuard } = require('../middleware/auth');
const { isValidPhone, isValidPincode, isValidEmail } = require('../utils/validators');

// create booking
router.post('/', authGuard, async (req, res) => {
  try {
    const data = req.body;
    // server-side validation
    if (!data.category || !data.pincode || !data.phone) return res.status(400).json({ message: 'Missing fields' });
    if (!isValidPincode(data.pincode)) return res.status(400).json({ message: 'Invalid pincode' });
    if (!isValidPhone(String(data.phone))) return res.status(400).json({ message: 'Invalid phone' });
    if (data.email && !isValidEmail(data.email)) return res.status(400).json({ message: 'Invalid email' });

    const booking = new Booking({
      user: req.user._id,
      category: data.category,
      details: data.details || {},
      address: data.address || '',
      pincode: data.pincode,
      phone: data.phone,
      email: data.email,
      durationType: data.durationType || 'month',
      packageName: data.packageName || '',
      schedule: data.schedule || [],
      userHolidays: []
    });

    await booking.save();
    // notify admin(s)
    req.io.emit('new_booking', booking);
    res.json({ success: true, booking });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// get bookings for logged-in user
router.get('/my', authGuard, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('maid').sort({ createdAt: -1 });
  res.json(bookings);
});

// get booking by id (user or admin)
router.get('/:id', authGuard, async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('maid user');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  // if user is the owner or admin
  if (String(booking.user._id) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json(booking);
});

// user marks a holiday (they don't want maid on this date) -> add to userHolidays and notify admin/maid
router.post('/:id/holiday', authGuard, async (req, res) => {
  const { date } = req.body; // expected 'YYYY-MM-DD'
  if (!date) return res.status(400).json({ message: 'date required' });
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (String(booking.user) !== String(req.user._id)) return res.status(403).json({ message: 'Not owner' });
  // add to userHolidays if not already
  if (!booking.userHolidays.includes(date)) {
    booking.userHolidays.push(date);
    booking.updates.push({ message: `User marked ${date} as holiday. Maid will not come.`, date: new Date() });
    await booking.save();
    // inform admin and maid
    req.io.emit('booking_update', booking);
    if (booking.maid) req.io.to(String(booking.maid)).emit('booking_update', booking);
  }
  res.json({ success: true, booking });
});

module.exports = router;
