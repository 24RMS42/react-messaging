const mongoose = require('mongoose');

// make sure we are running node 8.5+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 8 || (major === 8 && minor < 5)) {
  console.log('Please use Node.js version 8.5 or greater!\n');
  process.exit();
}

// import environmental variables from our variables.env file
const result = require('dotenv').config();

// try to connect to the MongoDB datebase
mongoose.connect(process.env.DATABASE);

// set mongoose to use ES6 promises
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
require('./models/user/User');
require('./models/message/Message');
require('./models/room/Room');
require('./models/workspace/Workspace');

// start our server
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
