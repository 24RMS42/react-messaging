exports.verificationTokenError = {
  name: 'InvalidVerificationTokenError',
  status: 401,
  message: 'Invalid verification token'
};

exports.resetTokenError = {
  name: 'InvalidResetTokenError',
  status: 401,
  message: 'Invalid reset token'
};

exports.incorrectUsernameError = {
  name: 'IncorrectUsernameError',
  status: 400,
  message: 'Username does not exist'
};

exports.userNotFoundError = {
  name: 'UserNotFoundError',
  status: 404,
  message: 'The specified user could not be found'
};
