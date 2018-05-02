const { notFoundError } = require('./errors');

// this error handler can be wrapped around middleware to automatically pass on errors
exports.catchErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

// if there is no route to handle the request, throw 404 error
exports.notFound = (req, res, next) => next(notFoundError);

// respond with error type and message in JSON format
exports.jsonError = (err, req, res, next) => {
  const status = err.status || 500;
  const errorDetails = {
    success: false,
    status,
    type: err.name,
    message: err.message
  };
  return res.status(status).json(errorDetails);
};
