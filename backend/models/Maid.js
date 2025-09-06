const mongoose = require('mongoose');
const MaidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male','female','any'], default: 'any' },
  skills: [{ type: String }], // e.g. ['cleaning','cooking','babysitting','elderlyCare']
  phone: String,
  rating: { type: Number, default: 5 },
  imageUrl: String,
  assignedBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  availability: [{ type: String }], // store dates as ISO strings 'YYYY-MM-DD'
  leaveDates: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Maid', MaidSchema);
