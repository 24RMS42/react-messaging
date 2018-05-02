const express = require('express');
const { enableCors } = require('./utils/middleware');
const api = require('./api/index');
require('./common/handlers/passportHandler');

// create our express app
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socket = require('./socket/socket.js');

// enable CORS
app.use(enableCors);

// trust x-forwarded-proto header from proxy
app.enable('trust proxy');

// handle our API routes
app.use('/', api);

io.on('connection', socket);

const port = 8000;
io.listen(port);

// export the app to be used in start.js
module.exports = app;
