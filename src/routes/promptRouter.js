const express = require('express');
const router = express.Router();
const openaiModel = require('../models/openaiModel.js');
const authenticate = require('../middlewares/authenticate.js');

router.post('/', authenticate, openaiModel, (req, res) => {
  res.json({ result: req.chatgptResponse });
});

module.exports = router;
