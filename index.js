const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('./src/middlewares/session');
const passport = require('./src/config/authConfig');
const promptRouter = require('./src/routes/promptRouter');
const authRouter = require('./src/routes/authRouter');
const errorHandler = require('./src/middlewares/errorHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const initDatabase = require('./src/config/initDatabase');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/process-code', promptRouter);
app.use('/auth', authRouter);
app.use(requestLogger);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

initDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
