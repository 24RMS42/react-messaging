const bodyParser = require('body-parser');

const enableCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  return next();
};

const parseBody = (req, res, next) => {
  if (req.method !== 'GET') {
    const jsonParser = bodyParser.json();
    return jsonParser(req, res, next);
  }

  return next();
};

const enableJsonSuccess = (req, res, next) => {
  res.jsonSuccess = (data) => {
    res.json({ success: true, data });
  };

  return next();
};

module.exports = {
  enableCors,
  parseBody,
  enableJsonSuccess
};
