const express = require('express');
const router = express.Router();

// Mock data for demo; replace with your real DB queries
router.get('/calendar-data', (req, res) => {
  const attendance = {
    '2024-06-05': true,
    '2024-06-06': false,
    '2024-06-10': true,
    '2024-06-15': true,
    '2024-06-20': false,
  };

  const holidays = ['2024-06-12', '2024-06-25'];

  res.json({ attendance, holidays });
});

module.exports = router;