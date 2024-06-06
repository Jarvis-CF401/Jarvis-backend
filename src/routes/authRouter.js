// Import necessary modules
const express = require('express');
const passport = require('../config/authConfig');
const authRouter = express.Router(); // Renamed to avoid conflicts

// Mock database to store user information
let users = [];

// Implement sign-in route
authRouter.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), (req, res) => {
  res.redirect('/');
});

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

// Implement signup route
authRouter.post('/signup', (req, res) => {
  console.log('Signup route reached');
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password // Note: In production, passwords should be hashed before storing.
  };

  // Add the new user to the mock database
  users.push(newUser);

  // Optionally, you can return the created user object as the response
  res.status(201).json(newUser);
});

module.exports = authRouter;
