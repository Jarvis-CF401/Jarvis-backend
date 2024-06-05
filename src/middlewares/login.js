'use strict';

const axios = require('axios');
require('dotenv').config();

async function login(req, res) {
  const { username, password } = req.body;

  const data = {
    grant_type: 'password',
    username: username,
    password: password,
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    scope: 'openid',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
  };

  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data });
  }
}

module.exports = login;
