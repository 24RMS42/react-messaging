const _ = require('lodash');
const jwt = require('jsonwebtoken');

const { invalidAccessTokenError } = require('./../errors');

const authenticate = ({ publicKey }) => async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return next(invalidAccessTokenError);
  }

  const parts = req.headers.authorization.split(' ');

  if (parts[0] !== 'Bearer') {
    return next(invalidAccessTokenError);
  }

  const options = {
    algorithms: ['RS256']
  };

  try {
    const decoded = await jwt.verify(parts[1], _.replace(publicKey, new RegExp('\\\\n', 'g'), '\n'), options);
    res.locals.user = {
      id: decoded.uid,
    };
  } catch (jwtErr) {
    return next(invalidAccessTokenError);
  }

  res.locals.user.matches = userId => (res.locals.user.id.toString() === userId.toString());

  return next();
};

const returnToken = ({ clientEmail, privateKey }) => (req, res) => {
  const { user } = res.locals;
  const oneHour = 60 * 60;
  const options = {
    algorithm: 'RS256',
    issuer: clientEmail,
    subject: clientEmail,
    expiresIn: oneHour,
    audience: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit'
  };

  const payload = {
    uid: user.id,

  };

  const accessToken = jwt.sign(payload, _.replace(privateKey, new RegExp('\\\\n', 'g'), '\n'), options);

  res.json({
    success: true,
    data: {
      accessToken
    }
  });
};

module.exports = {
  authenticate,
  returnToken
};
