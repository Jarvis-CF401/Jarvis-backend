require('dotenv').config();
const axios = require('axios');

const openaiMiddleware = async (req, res, next) => {
  try {
    if (!req.body.messages || !Array.isArray(req.body.messages) || req.body.messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided or invalid format' });
    }

    const messages = req.body.messages;

    const requestBody = {
      messages: messages,
      model: 'gpt-3.5-turbo',
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const completion = response.data.choices[0].message;

    req.chatgptResponse = completion;

    next();
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = openaiMiddleware;
