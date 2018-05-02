const passport = require('passport');
const mongoose = require('mongoose');
// const FacebookTokenStrategy = require('passport-facebook-token');

const User = mongoose.model('User');

passport.use(User.createStrategy());

// const facebookOptions = {
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET
// };

// passport.use(new FacebookTokenStrategy(facebookOptions, verifyFacebook));
