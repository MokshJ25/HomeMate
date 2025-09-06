const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authGuard } = require('../middleware/auth');

// create booking (user)
router.post('/', authGuard, async (req, res) => {
  try {
    const data = req.body;
    // validate pincode etc server-side
    const booking = new Booking({
      user: req.user._id,
      category: data.category,
      details: data.details,
      address: data.address,
      pincode: data.pincode,
      phone: data.phone,
      email: data.email,
      durationType: data.durationType,
      packageName: data.packageName,
      schedule: data.schedule, // array of dates
    });
    await booking.save();
    // notify admin via socket (broadcast)
    req.io.emit('new_booking', booking);
    res.json({ success: true, booking });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
