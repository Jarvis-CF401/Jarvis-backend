require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const app = express();
const port = process.env.PORT || 3000;

const sessionConfig = require('./src/config/session');
const passport = require('./src/config/auth');
const promptRouter = require('./src/routes/promptRouter');
const authRouter = require('./src/routes/authRouter');
const errorHandler = require('./src/middlewares/errorHandler');
const requestLogger = require('./src/middlewares/requestLogger');
const initDatabase = require('./src/config/initDatabase');

app.use(bodyParser.json());
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

initDatabase().then(() => {
  app.use('/auth', authRouter);
  app.use('/process-code', promptRouter);

  app.use(requestLogger);
  app.use(errorHandler);

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
});
