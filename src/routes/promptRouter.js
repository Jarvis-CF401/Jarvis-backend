const express = require('express');
const router = express.Router();
const openaiModel = require('../models/openaiModel.js');

router.post('/', openaiModel, (req, res) => {
  res.json({ result: req.chatgptResponse });
});

module.exports = router;
