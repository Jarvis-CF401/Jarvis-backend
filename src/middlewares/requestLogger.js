const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
  next();
};

module.exports = requestLogger;