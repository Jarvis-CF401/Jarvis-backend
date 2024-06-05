const express = require('express');
const router = express.Router();
const openaiMiddleware = require('../models/openaiModel');
const { verifyUser } = require('../middlewares/authorize');

router.post('/', verifyUser, openaiMiddleware, (req, res) => {
  res.json({ result: req.chatgptResponse });
});

module.exports = router;
