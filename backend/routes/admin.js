// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Maid = require('../models/Maid');
const { authGuard, adminGuard } = require('../middleware/auth');

// get all bookings
router.get('/bookings', authGuard, adminGuard, async (req, res) => {
  const bookings = await Booking.find().populate('user maid').sort({ createdAt: -1 });
  res.json(bookings);
});

// assign maid to booking (admin)
router.put('/assign/:bookingId', authGuard, adminGuard, async (req, res) => {
  const { maidId } = req.body;
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  const maid = await Maid.findById(maidId);
  if (!maid) return res.status(404).json({ message: 'Maid not found' });

  // check conflicts: if any booking date conflicts with maid leaveDates or bookedDates
  const conflict = booking.schedule.some(d => (maid.leaveDates || []).includes(d) || (maid.bookedDates || []).includes(d));
  if (conflict) return res.status(400).json({ message: 'Maid not available on some schedule dates' });

  booking.maid = maid._id;
  booking.status = 'assigned';
  booking.updates.push({ message: `Maid ${maid.name} assigned by admin.`, date: new Date() });
  await booking.save();

  // add booking to maid and mark dates as booked
  maid.assignedBookings.push(booking._id);
  maid.bookedDates = (maid.bookedDates || []).concat(booking.schedule);
  await maid.save();

  // notify user and admin dashboard via socket
  req.io.emit('booking_assigned', { bookingId: booking._id, maidId: maid._id });
  req.io.to(String(booking.user)).emit('booking_update', booking);

  res.json({ success: true, booking });
});

// mark maid leave date (admin)
router.put('/maid/:maidId/leave', authGuard, adminGuard, async (req, res) => {
  const { maidId } = req.params;
  const { date } = req.body;
  const maid = await Maid.findById(maidId);
  if (!maid) return res.status(404).json({ message: 'Maid not found' });

  if (!maid.leaveDates.includes(date)) maid.leaveDates.push(date);
  // find bookings that are affected
  const affectedBookings = await Booking.find({ maid: maid._id, schedule: date });
  for (let b of affectedBookings) {
    b.updates.push({ message: `Maid ${maid.name} is on leave on ${date}. Admin will reassign.`, date: new Date() });
    // set status to pending so admin can reassign if desired
    b.status = 'approved';
    await b.save();
    // notify the user
    req.io.to(String(b.user)).emit('booking_update', b);
  }

  await maid.save();
  res.json({ success: true, maid, affectedBookings });
});

module.exports = router;
