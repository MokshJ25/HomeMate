const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  pincode: { type: String, required: true },
  location: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('User ', userSchema);