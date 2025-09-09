// backend/routes/maids.js
const express = require('express');
const router = express.Router();
const Maid = require('../models/Maid');
const { authGuard, adminGuard } = require('../middleware/auth');

// get all maids (public) -- can filter by skill
router.get('/', async (req, res) => {
  const { skill } = req.query;
  const query = {};
  if (skill) query.skills = skill;
  const maids = await Maid.find(query).sort({ rating: -1 });
  res.json(maids);
});

// get single maid
router.get('/:id', async (req, res) => {
  const maid = await Maid.findById(req.params.id);
  if (!maid) return res.status(404).json({ message: 'Maid not found' });
  res.json(maid);
});

// create maid (admin)
router.post('/', authGuard, adminGuard, async (req, res) => {
  const { name, gender, skills, phone, imageUrl } = req.body;
  const maid = new Maid({ name, gender, skills, phone, imageUrl });
  await maid.save();
  res.json({ success: true, maid });
});

// search maid by skill & availability for a particular date (query: skill, date)
router.get('/search/availability', async (req, res) => {
  const { skill, date } = req.query;
  if (!skill || !date) return res.status(400).json({ message: 'skill and date required' });
  const all = await Maid.find({ skills: skill });
  // filter where date is not in leaveDates and not in bookedDates
  const available = all.filter(m => !m.leaveDates?.includes(date) && !m.bookedDates?.includes(date));
  res.json({ available });
});

module.exports = router;
