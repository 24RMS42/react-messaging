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
const returnRoom = (req, res) => res.jsonSuccess(res.locals.room);

const Room = mongoose.model('Room');

const loadRooms = async (req, res, next) => {
  let results = await Room.find({});
  if (results.length == 0) {
    await Room.create({participants: []});
    results = await Room.find({});
  }
  res.locals.room = results;
  return next();
};
module.exports = {
  loadRooms,
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
  returnRoom,
  // localLogin
};
