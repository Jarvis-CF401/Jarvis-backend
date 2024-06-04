const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const promptRouter = require('./src/Routes/promptRouter.js');
const errorHandler = require('./src/Middlewares/errorHandler.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/process-code', promptRouter);

// Error handling middleware should be used after all other middleware and routes
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
