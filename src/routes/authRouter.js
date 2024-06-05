const express = require('express');
const router = express.Router();
const login = require('../middlewares/login');
const signupMiddleware = require('../middlewares/signup');
const { verifyUser, simpleAuthCheck } = require('../middlewares/authorize');

router.post('/login', login);
router.post('/signup', signupMiddleware);

module.exports = router;
