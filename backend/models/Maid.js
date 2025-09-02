const mongoose = require('mongoose');
const maidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  skills: [{ type: String, enum: ['Cleaning', 'Cooking', 'Babysitting', 'Elderly Care'] }],
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  leaves: [{ date: Date, reason: String }]
}, { timestamps: true });
module.exports = mongoose.model('Maid', maidSchema);