const { none, invalid, tooShort } = require('./commonValidationMessages');

const tooEasy = field => `Please use at least one upper and lowercase character, a number and a symbol for the ${field}`;

module.exports = {
  email: {
    invalid: invalid('email address')
  },
  password: {
    none: none('password'),
    tooShort: tooShort('password', 8),
    tooEasy: tooEasy('password')
  },
  firstName: {
    none: none('first name'),
    tooShort: tooShort('first name', 2)
  },
  lastName: {
    none: none('last name'),
    tooShort: tooShort('last name', 2)
  },
  newPassword: {
    none: none('new password'),
    tooShort: tooShort('new password', 8),
    tooEasy: tooEasy('new password')
  }
};
