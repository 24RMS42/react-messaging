const mongoose = require('mongoose');

// const { catchErrors } = require('../../utils/error');
// const { loadUser } = require('./userMiddleware');
// const {
//   verificationTokenError,
//   resetTokenError,
//   incorrectUsernameError
// } = require('./../../common/errors/userErrors');
// const {
//   validateRegistration,
//   validateResetRequest,
//   validateReset,
//   validateChangePassword
// } = require('./../../common/validators/userValidators');

const returnSuccess = (req, res) => res.jsonSuccess();
const returnMessages = (req, res) => res.jsonSuccess(res.locals.messages);

const Message = mongoose.model('Message');

const loadMessage = async (req, res, next) => {
  let results = await Message.find({
    createdAt: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    }
  });
  res.locals.messages = results;
  return next();
};

module.exports = {
  loadMessage,
  // register: [
  //   validateRegistration,
  //   catchErrors(register)
  // ],
  // verify: catchErrors(verify),
  // generateResetToken: [
  //   validateResetRequest,
  //   catchErrors(generateResetToken)
  // ],
  // reset: [
  //   validateReset,
  //   catchErrors(reset)
  // ],
  // changePassword: [
  //   validateChangePassword,
  //   catchErrors(changePassword)
  // ],
  // loadUser,
  returnSuccess,
  returnMessages,
  // localLogin
};
