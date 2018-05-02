const express = require('express');
const { jwt } = require('../utils/auth');

const msgController = require('./../controllers/message/messageController');

const msgRouter = express.Router();

// msgRouter.use(
//   jwt.authenticate({
//     publicKey: process.env.FIREBASE_PUBLIC_KEY
//   })
// );

msgRouter.route('/')
  .get(
    msgController.loadMessage,
    msgController.returnMessages
);

module.exports = msgRouter;
