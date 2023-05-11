function errorHandler(error, req, res, next) {
console.log(error);
  if (error.message === 'bad request') {
    res.status(400).json({ error: 'email already exists' });
  } else {
    res.status(500).json({ error: 'An error occurred' });
  }
}
export default errorHandler;
