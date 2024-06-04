const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const config = require('./config/config');
const promptRouter = require('./routes/promptRouter');

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware for JSON parsing

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/process-code', promptRouter);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});

