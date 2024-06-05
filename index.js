const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const promptRouter = require('./src/routes/promptRouter');
const authRouter = require('./src/routes/authRouter');
const errorHandler = require('./src/middlewares/errorHandler');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/process-code', promptRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
