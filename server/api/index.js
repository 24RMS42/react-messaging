const express = require('express');
const passport = require('passport');
const { signature } = require('../utils/auth');
const { notFound, jsonError } = require('../utils/error');
const { parseBody, enableJsonSuccess } = require('../utils/middleware');

const userRouter = require('./userRouter');
const roomRouter = require('./roomRouter');
const messageRouter = require('./messageRouter');
const workspaceRouter = require('./workspaceRouter');

const router = express.Router();

// use a body-parser depending on request method
router.use(parseBody);

// initialize passport
router.use(passport.initialize());

// allow us to easily return successful json responses
router.use(enableJsonSuccess);

// verify the signature of all incoming requests
// router.use(signature.verify(process.env.SIGNATURE_SECRET));

// use the appropriate router for each API section
router.use('/user', userRouter);

router.use('/room', roomRouter);

router.use('/message', messageRouter);

router.use('/workspace', workspaceRouter);

// if none of the routes apply, throw 404 and forward to error handler
router.use(notFound);

// respond with json formatted error
router.use(jsonError);

module.exports = router;
