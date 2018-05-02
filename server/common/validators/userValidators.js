const { sanitize } = require('express-validator/filter');
const { check } = require('express-validator/check');

const { validationErrors } = require('./commonValidators');
const messages = require('./messages/userValidationMessages');

const emailValidator = [
  sanitize('email').normalizeEmail(),
  check('email', messages.email.invalid).isEmail()
];

const passwordValidator = field => [
  check(field, messages[field].none).exists(),
  check(field, messages[field].tooShort).isLength({ min: 8 }),
  // check(field, messages[field].tooEasy).matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*(_|\\W)).+$')
];

const registrationValidator = [
  ...emailValidator,
  sanitize(['firstName', 'lastName']),
  check('firstName', messages.firstName.none).exists(),
  check('firstName', messages.firstName.tooShort).isLength({ min: 2 }),
  check('lastName', messages.lastName.none).exists(),
  check('lastName', messages.lastName.tooShort).isLength({ min: 2 }),
  ...passwordValidator('password')
];

const createWorkspaceValidator = [
  ...emailValidator,
  check('fullName', messages.firstName.none).exists(),
  check('fullName', messages.firstName.tooShort).isLength({ min: 2 }),
  check('displayName', messages.lastName.none).exists(),
  check('displayName', messages.lastName.tooShort).isLength({ min: 2 }),
  ...passwordValidator('password')
];

const resetRequestValidator = emailValidator;
const resetValidator = passwordValidator('password');

const changePasswordValidator = passwordValidator('newPassword');

module.exports = {
  validateCreateWorkspace: [
    createWorkspaceValidator,
    validationErrors
  ],
  validateRegistration: [
    registrationValidator,
    validationErrors
  ],
  validateResetRequest: [
    resetRequestValidator,
    validationErrors
  ],
  validateReset: [
    resetValidator,
    validationErrors
  ],
  validateChangePassword: [
    changePasswordValidator,
    validationErrors
  ]
};
