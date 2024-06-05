const request = require('supertest');
const express = require('express');
const dotenv = require('dotenv');
const openaiMiddleware = require('../src/middlewares/openaiMiddleware');
const errorHandler = require('../src/middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());
app.post('/test-openai', openaiMiddleware, (req, res) => {
  res.json({ result: req.chatgptResponse });
});
app.use(errorHandler);

describe('OpenAI Middleware Test', () => {
  it('should return the response from OpenAI API', async () => {
    const response = await request(app)
      .post('/test-openai')
      .send({
        messages: [
          { role: 'user', content: 'Who won the world series in 2020?' },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.result).toBeDefined();
    expect(response.body.result.role).toBe('assistant');
    expect(response.body.result.content).toContain('2020');
  });

  it('should return 400 if no messages are provided', async () => {
    const response = await request(app)
      .post('/test-openai')
      .send({ messages: [] });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No messages provided or invalid format');
  });

  it('should return 400 if messages format is invalid', async () => {
    const response = await request(app)
      .post('/test-openai')
      .send({ messages: 'invalid_format' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No messages provided or invalid format');
  });

  it('should handle errors from OpenAI API', async () => {
    
    const invalidApp = express();
    invalidApp.use(express.json());
    invalidApp.post('/test-openai', openaiMiddleware, (req, res) => {
      res.json({ result: req.chatgptResponse });
    });
    invalidApp.use(errorHandler);
    
    process.env.OPENAI_API_KEY = 'INVALID_KEY';
    
    const response = await request(invalidApp)
      .post('/test-openai')
      .send({
        messages: [
          { role: 'user', content: 'Who won the world series in 2020?' },
        ],
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
    
    process.env.OPENAI_API_KEY = dotenv.config().parsed.OPENAI_API_KEY;
  });
});
