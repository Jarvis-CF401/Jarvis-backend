const express = require('express');
const User = require('../models/user');
const passport = require('../config/authConfig');
const authRouter = express.Router();

// Implement sign-up route
authRouter.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

// Implement login route
authRouter.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}));

// Implement callback route
authRouter.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});

// Implement logout route
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
