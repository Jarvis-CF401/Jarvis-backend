'use strict';

const axios = require('axios');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function signupMiddleware(req, res) {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = {
    email: email,
    password: hashedPassword,
    connection: 'Username-Password-Authentication',
  };

  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH0_CLIENT_SECRET}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data });
  }
}

module.exports = signupMiddleware;
