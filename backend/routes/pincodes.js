const express = require('express');
const router = express.Router();
const Pincode = require('../models/Pincode');

// check pincode
router.get('/check/:pincode', async (req, res) => {
  const { pincode } = req.params;
  // search for pincode in any city doc
  const doc = await Pincode.findOne({ pincodes: pincode });
  if (doc) return res.json({ available: true, city: doc.city });
  return res.json({ available: false });
});

module.exports = router;
