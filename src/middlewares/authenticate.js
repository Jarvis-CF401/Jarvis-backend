const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  console.log('Authorization Middleware Triggered');
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log('Invalid or expired token');
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
