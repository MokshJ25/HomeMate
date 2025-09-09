const express = require('express');
const router = express.Router();
const { authGuard, adminGuard } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Maid = require('../models/Maid');

// get pending bookings
router.get('/bookings', authGuard, adminGuard, async (req, res) => {
  const bookings = await Booking.find().populate('user').sort({ createdAt: -1 });
  res.json(bookings);
});

// assign maid
router.put('/assign/:bookingId', authGuard, adminGuard, async (req, res) => {
  const { bookingId } = req.params;
  const { maidId } = req.body;
  const booking = await Booking.findById(bookingId);
  const maid = await Maid.findById(maidId);
  if (!booking || !maid) return res.status(404).json({ message: 'Not found' });

  // check maid availability for all schedule dates
  const conflict = booking.schedule.some(d => maid.leaveDates.includes(d) || maid.availability.includes(d));
  // If maid.availability stores booked dates, check conflict accordingly
  if (conflict) return res.status(400).json({ message: 'Maid not available on some dates' });

  // assign
  booking.maid = maidId;
  booking.status = 'assigned';
  booking.updates.push({ message: `Maid ${maid.name} assigned.`, date: new Date() });
  await booking.save();

  // add booking to maid
  maid.assignedBookings.push(bookingId);
  maid.availability = maid.availability.concat(booking.schedule); // mark dates as booked
  await maid.save();

  // notify user via socket to the user's room
  req.io.to(String(booking.user)).emit('booking_update', booking);
  res.json({ success: true, booking });
});

// mark maid leave
router.put('/maid/:maidId/leave', authGuard, adminGuard, async (req, res) => {
  const { maidId } = req.params;
  const { date } = req.body; // 'YYYY-MM-DD'
  const maid = await Maid.findById(maidId);
  if(!maid) return res.status(404).json({ message: 'Maid not found' });
  maid.leaveDates.push(date);
  // find affected bookings and notify
  await maid.save();
  // TODO: find bookings scheduled on that date and reassign or notify
  res.json({ success: true, maid });
});

module.exports = router;
