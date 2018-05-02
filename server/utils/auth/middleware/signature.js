const crypto = require('crypto');
const url = require('url');

const { getCurrentTimestamp } = require('./../common');
const { missingSignatureError, expiredSignatureError, invalidSignatureError } = require('./../errors');

exports.verify = signatureSecret => (req, res, next) => {
  const vars = (req.method === 'GET') ? req.query : req.body;
  if (!vars.timestamp || !vars.signature) {
    return next(missingSignatureError);
  }

  const currentTimestamp = getCurrentTimestamp();
  const timeDifference = Math.abs(Number(vars.timestamp) - currentTimestamp);
  const fiveMinutes = 5 * 60;
  if (timeDifference > fiveMinutes) {
    return next(expiredSignatureError);
  }

  const originalUrl = url.parse(req.originalUrl).pathname.replace(/\/$/, '');
  const fullUrl = `${req.protocol}://${req.get('host')}${originalUrl}`;
  const text = `${req.method}+${fullUrl}+${vars.timestamp}`;
  const signature = crypto.createHmac('sha256', signatureSecret).update(text).digest('hex');

  if (signature !== vars.signature) {
    return next(invalidSignatureError);
  }

  return next();
};
