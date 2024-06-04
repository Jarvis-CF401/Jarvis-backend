const axios = require('axios');
const config = require('../config/config');

const processCode = async (req, res, next) => {
  try {
    if (!req.body.messages || !Array.isArray(req.body.messages) || req.body.messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided or invalid format' });
    }

    const messages = req.body.messages;

    const requestBody = {
      messages: messages,
      model: 'gpt-3.5-turbo'
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openaiApiKey}`
      }
    });

    // Extract the completion from the response
    const completion = response.data.choices[0].message;

    req.chatgptResponse = completion;

    await next();
  } catch (error) {
    console.error('Error processing the code with ChatGPT:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error('Error message:', error.message);
      res.status(500).json({ error: 'Failed to process the code', details: error.message });
    }
  }
};

module.exports = { processCode };
