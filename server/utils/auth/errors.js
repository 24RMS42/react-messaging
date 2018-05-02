const missingSignatureError = {
  name: 'MissingSignatureError',
  status: 401,
  message: 'No timestamp or signature was included in the request'
};

const expiredSignatureError = {
  name: 'ExpiredSignatureError',
  status: 401,
  message: 'The signature timestamp is older than 5 minutes'
};

const invalidSignatureError = {
  name: 'InvalidSignatureError',
  status: 401,
  message: 'Invalid signature'
};

const invalidAccessTokenError = {
  name: 'InvalidAccessTokenError',
  status: 401,
  message: 'Invalid access token'
};

module.exports = {
  missingSignatureError,
  expiredSignatureError,
  invalidSignatureError,
  invalidAccessTokenError
};
