exports.validationError = {
  name: 'ValidationError',
  status: 400,
  message: 'The request parameters did not pass validation'
};

exports.invalidIdError = {
  name: 'InvalidIdError',
  status: 400,
  message: 'The specified ID is invalid'
};

exports.unhandledError = {
  name: 'UnknownError',
  status: 500,
  message: 'An unhandled error occured. Please contact the administrator with details on how to re-create the error'
};
