const mongoose = require('mongoose');
const validator = require('validator');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const workspaceSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, true],
    required: true
  },
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  displayName: {
    type: String,
    trim: true,
    required: true
  }
});

workspaceSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
workspaceSchema.plugin(mongoDbErrorHandler);

workspaceSchema.index({
  verificationToken: 1
});

workspaceSchema.methods.matches = function matches (userId) {
  return (this.id.toString() === userId.toString());
};

module.exports = mongoose.model('Workspace', workspaceSchema);
