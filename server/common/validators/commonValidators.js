const _ = require('lodash');
const moment = require('moment');
const { validationResult } = require('express-validator/check');
const { validationError } = require('./../errors/generalErrors');

exports.validationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = {
      ...validationError,
      message: validationErrors.array()[0].msg
    };
    return next(err);
  }

  return next();
};

exports.makeUnique = (field, key) => (req, res, next) => {
  if (!req.body[field] || req.body[field].constructor !== Array) {
    return next();
  }

  if (!key) {
    req.body[field] = _.uniq(req.body[field]);
    return next();
  }

  req.body[field] = _.uniqBy(req.body[field], key);

  return next();
};

exports.convertToDate = field => (req, res, next) => {
  if (!req.body[field]) {
    return next();
  }

  try {
    req.body[field] = moment.utc(req.body[field])
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toDate();
  } catch (e) {
    req.body[field] = undefined;
  }

  return next();
};
