// frontend/src/utils/validators.js
export const isValidPhone = (p) => /^\d{10}$/.test(String(p));
export const isValidPincode = (p) => /^\d{6}$/.test(String(p));
export const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e));
