// backend/utils/validators.js
module.exports = {
  isValidPhone: (p) => /^\d{10}$/.test(p),
  isValidPincode: (p) => /^\d{6}$/.test(p),
  isValidEmail: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
};
