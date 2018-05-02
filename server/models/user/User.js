const mongoose = require('mongoose');
const validator = require('validator');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, true],
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  verificationToken: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean
  },
  resetToken: {
    type: String,
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongoDbErrorHandler);

userSchema.index({
  verificationToken: 1
});

const basicUserKeys = [
  'email',
  'firstName',
  'lastName'
];

userSchema.methods.matches = function matches (userId) {
  return (this.id.toString() === userId.toString());
};

userSchema.statics.getBasicUserKeys = function getBasicUserKeys () {
  return basicUserKeys;
};

module.exports = mongoose.model('User', userSchema);
