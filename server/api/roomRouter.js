const express = require('express');
const { jwt } = require('../utils/auth');

const roomController = require('./../controllers/room/roomController');

const roomRouter = express.Router();

roomRouter.use(
  jwt.authenticate({
    publicKey: process.env.FIREBASE_PUBLIC_KEY
  })
);

roomRouter.route('/')
  .get(
    roomController.loadRooms,
    roomController.returnRoom
);


module.exports = roomRouter;
