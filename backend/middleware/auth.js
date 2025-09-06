const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = {
  authGuard: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Missing token' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) { res.status(401).json({ message: 'Unauthorized' }); }
  },
  adminGuard: (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin only' });
  }
};
