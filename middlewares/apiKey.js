const ErrorHandler = require('../errors/ErrorHandler');

function apiKey(req, res, next) {
  const api_key = '1234567';
  const userApiKey = req.query.api_key;
  if (userApiKey && userApiKey === api_key) {
    next();
  } else {
    next(ErrorHandler.forbiddenError('API Key is not Valid!'));
    // res.json({ message: 'Not Allowed !!!' });
  }
}

module.exports = apiKey;
