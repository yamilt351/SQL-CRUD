function errorHandler(error, req, res, next) {
  if (error.message === 'bad request') {
    res.status(400).json({ error: 'email already exists' });
  } else {
    next(error);
  }
}
export default errorHandler;
