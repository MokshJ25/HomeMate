const express = require('express');
const Booking = require('../models/Booking');
const Maid = require('../models/Maid');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.userId }).populate('maid').populate('customer');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { service, genderPreference, duration, preferredTime, specialRequests } = req.body;
    const booking = new Booking({
      customer: req.user.userId,
      service,
      genderPreference,
      duration,
      preferredTime,
      specialRequests
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created', bookingId: booking._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/approve', auth, async (req, res) => {
  const { maidId } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'Approved', maid: maidId }, { new: true });
    res.json({ message: 'Booking approved and maid assigned', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/maid/:id/leave', auth, async (req, res) => {
  const { date, reason } = req.body;
  try {
    await Maid.findByIdAndUpdate(req.params.id, { $push: { leaves: { date, reason } } });
    res.json({ message: 'Leave marked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;