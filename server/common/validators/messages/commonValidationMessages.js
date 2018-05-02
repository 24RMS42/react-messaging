const none = field => `Please supply a ${field}`;
const invalid = field => `Please supply a valid ${field}`;
const invalidBoolean = () => invalid('boolean value');
const tooLong = (field, max) => `Please use at most ${max} characters for the ${field}`;
const tooShort = (field, min) => `Please use at least ${min} characters for the ${field}`;
const tooLow = (field, min) => `Please use a value of at least ${min} for the ${field}`;

module.exports = {
  none,
  invalid,
  invalidBoolean,
  tooLong,
  tooShort,
  tooLow
};
