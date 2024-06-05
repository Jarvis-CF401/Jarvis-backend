'use strict';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

function verifyUser(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: 'No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: 'Failed to authenticate token.' });
    }
    request.user = decoded;
    next();
  });
}

function simpleAuthCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];

  if (token === process.env.AUTH_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
}

module.exports = { verifyUser, simpleAuthCheck };
