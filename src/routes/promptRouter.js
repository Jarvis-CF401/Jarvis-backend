const express = require('express');
const router = express.Router();
const openaiMiddleware = require('../middlewares/openaiMiddleware.js');

router.post('/', openaiMiddleware, (req, res) => {
  res.json({ result: req.chatgptResponse });
});

module.exports = router;
