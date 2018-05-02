const _ = require('lodash');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const passport = require('passport');

const { catchErrors } = require('../../utils/error');
const { loadUser } = require('./userMiddleware');
const {
  verificationTokenError,
  resetTokenError,
  incorrectUsernameError
} = require('./../../common/errors/userErrors');
const {
  validateCreateWorkspace,
  validateRegistration,
  validateResetRequest,
  validateReset,
  validateChangePassword
} = require('./../../common/validators/userValidators');

const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');

const register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isVerified: false,
    verificationToken: crypto.randomBytes(20).toString('hex')
  });

  const registerPromise = promisify(User.register, User);
  await registerPromise(user, req.body.password);

  res.locals.user = user;

  return next();
};

const workspace = async (req, res, next) => {
  const workspace = new Workspace({
    email: req.body.email,
    fullName: req.body.firstName,
    displayName: req.body.lastName
  });

  const registerPromise = promisify(Workspace.register, Workspace);
  await registerPromise(workspace, req.body.password);

  return next();
};

const verify = async (req, res, next) => {
  const user = await User.findOne({
    verificationToken: req.params.verificationToken
  });

  if (!user) {
    return next(verificationTokenError);
  }

  user.verificationToken = undefined;
  user.isVerified = true;
  await user.save();

  res.locals.user = user;

  return next();
};

const generateResetToken = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return next(incorrectUsernameError);
  }

  user.resetToken = crypto.randomBytes(20).toString('hex');
  await user.save();

  res.locals.user = user;

  return next();
};

const reset = async (req, res, next) => {
  const user = await User.findOne({
    resetToken: req.params.resetToken
  });

  if (!user) {
    return next(resetTokenError);
  }

  const setPasswordPromise = promisify(user.setPassword, user);
  await setPasswordPromise(req.body.password);

  user.resetToken = undefined;
  await user.save();

  return next();
};

const changePassword = async (req, res, next) => {
  const { user } = res.locals;
  const { oldPassword, newPassword } = req.body;

  const changePasswordPromise = promisify(user.changePassword, user);
  await changePasswordPromise(oldPassword, newPassword);

  return next();
};

const returnSuccess = (req, res) => res.jsonSuccess();
const returnUser = (req, res) => res.jsonSuccess(_.pick(res.locals.user, User.getBasicUserKeys()));

const localLogin = async (req, res, next) => {
  const authPromise = new Promise((resolve, reject) =>
    passport.authenticate('local', { session: false, failWithError: true }, (err, user, info) => {
      if (err) {
        return reject(err);
      }

      if (!user) {
        return reject({ ...info, status: 401 });
      }
      
      return resolve(user);  
    })(req, res, next)
  );

  const user = await authPromise;

  res.locals.user = user;

  return next();
};
module.exports = {
  createWorkspace: [
    validateCreateWorkspace,
    catchErrors(workspace)
  ],
  register: [
    validateRegistration,
    catchErrors(register)
  ],
  verify: catchErrors(verify),
  generateResetToken: [
    validateResetRequest,
    catchErrors(generateResetToken)
  ],
  reset: [
    validateReset,
    catchErrors(reset)
  ],
  changePassword: [
    validateChangePassword,
    catchErrors(changePassword)
  ],
  loadUser,
  returnSuccess,
  returnUser,
  localLogin
};
