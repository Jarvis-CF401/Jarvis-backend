const express = require('express');
const { processCode } = require('../middlewares/openaiMiddleware');

const router = express.Router();

router.use(express.json());

router.post('/', processCode, (req, res) => {
  res.json({ result: req.chatgptResponse });
});

module.exports = router;