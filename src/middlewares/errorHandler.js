const errorHandler = (error, req, res, next) => {
  console.error('Error processing the code with ChatGPT:', error);
  if (error.response) {
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
    res.status(error.response.status).json({ error: error.response.data });
  } else {
    console.error('Error message:', error.message);
    res.status(500).json({ error: 'Failed to process the code', details: error.message });
  }
};

module.exports = errorHandler;
