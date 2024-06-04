require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (!req.body.code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const userCode = req.body.code;

    const response = await openai.Completions.create({
      model: "text-davinci-003",
      prompt: `Please analyze the following code and return the requested information:\n\n${userCode}`,
      maxTokens: 150
    });

    req.chatgptResponse = response.choices[0].text;

    next();
  } catch (error) {
    console.error('Error processing the code with ChatGPT:', error);
    res.status(500).json({ error: 'Failed to process the code' });
  }
});

app.post('/process-code', (req, res) => {
  res.json({ result: req.chatgptResponse });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
