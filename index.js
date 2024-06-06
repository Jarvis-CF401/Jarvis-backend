const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./src/middlewares/session.js'); // Import session middleware
const passport = require('passport');

const authRouter = require('./src/routes/authRouter.js');
const errorHandler = require('./src/middlewares/errorHandler.js');
const requestLogger = require('./src/middlewares/requestLogger.js');


require('dotenv').config();

const port = process.env.PORT || 3000;

const promptRouter = require('./src/routes/promptRouter.js');

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Session middleware
app.use(sessionMiddleware);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Authentication routes
app.use('/auth', authRouter);

// Process code route
app.use('/process-code', promptRouter);

// Request logger middleware
app.use(requestLogger);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
