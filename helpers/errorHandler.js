function errorHandler(error, req, res, next) {
  if (error.message === 'bad request') {
    res.status(400).json({ error: 'bad request' });
  } else {
    next(error);
  }
}
export default errorHandler;
