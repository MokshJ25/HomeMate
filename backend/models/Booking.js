const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  maid: { type: mongoose.Schema.Types.ObjectId, ref: 'Maid', default: null },
  category: { type: String, required: true }, // cleaning, cooking, babysitting, elderlyCare, other
  details: { type: Object }, // dynamic based on category
  address: { type: String },
  pincode: { type: String },
  phone: { type: String },
  email: { type: String },
  durationType: { type: String, enum: ['day','week','month','quarter','halfYear','year'] },
  packageName: String,
  schedule: [{ type: String }], // dates e.g. '2025-09-08'
  status: { type: String, enum: ['pending','approved','assigned','completed','cancelled'], default: 'pending' },
  updates: [{ message: String, date: Date }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
