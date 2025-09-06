const mongoose = require('mongoose');
const PincodeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  pincodes: [{ type: String, required: true }]
});
module.exports = mongoose.model('Pincode', PincodeSchema);
