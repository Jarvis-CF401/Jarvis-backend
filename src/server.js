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

// Middleware to process user-submitted code
app.use(async (req, res, next) => {
  try {
    if (!req.body.code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const userCode = req.body.code;

    // Send the user code to ChatGPT
    const response = await openai.Completions.create({
      model: "text-davinci-003",
      prompt: `Please analyze the following code and return the requested information:\n\n${userCode}`,
      maxTokens: 150
    });

    // Attach the response to the request object for further processing
    req.chatgptResponse = response.choices[0].text;

    next();
  } catch (error) {
    console.error('Error processing the code with ChatGPT:', error);
    res.status(500).json({ error: 'Failed to process the code' });
  }
});

// Route to handle the processed code
app.post('/process-code', (req, res) => {
  res.json({ result: req.chatgptResponse });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
