const express = require('express');
const { jwt } = require('../utils/auth');

const userController = require('./../controllers/user/userController');

const userRouter = express.Router();

/**
  Publicly available user routes
**/

userRouter.route('/register')
  .post(
    userController.register,
    userController.returnUser
  );

userRouter.route('/verify/:verificationToken')
  .post(
    userController.verify,
    userController.returnSuccess
  );

userRouter.route('/login')
  .post(
    userController.localLogin,
    jwt.returnToken({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
  );

userRouter.route('/request-reset')
  .post(
    userController.generateResetToken,
    userController.returnSuccess
  );

userRouter.route('/reset/:resetToken')
  .post(
    userController.reset,
    userController.returnSuccess
  );

/**
  User routes that require an access token
**/

userRouter.use(
  jwt.authenticate({
    publicKey: process.env.FIREBASE_PUBLIC_KEY
  })
);

userRouter.route('/')
  .get(
    userController.loadUser,
    userController.returnUser
  );

userRouter.route('/change-password')
  .post(
    userController.loadUser,
    userController.changePassword,
    userController.returnSuccess
  );

module.exports = userRouter;
