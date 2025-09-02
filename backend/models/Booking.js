const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  maid: { type: mongoose.Schema.Types.ObjectId, ref: 'Maid', default: null },
  service: { type: String, enum: ['Cleaning', 'Cooking', 'Babysitting', 'Elderly Care'], required: true },
  genderPreference: { type: String, enum: ['Male', 'Female', 'Any'], default: 'Any' },
  duration: { type: String, enum: ['Day', 'Week', 'Month', 'Quarter', 'HalfYear', 'FullYear'], required: true },
  preferredTime: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  specialRequests: [{ date: Date, service: String, status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' } }],
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], default: 'Pending' },
  attendance: [{ date: Date, present: Boolean, notes: String }]
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);