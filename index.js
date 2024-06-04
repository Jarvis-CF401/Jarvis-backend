const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const promptRouter = require('./src/prompt');

app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/process-code', promptRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
