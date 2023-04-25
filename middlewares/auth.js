const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const { JsonWebTokenError } = jwt;

const { SECRET_KEY } = process.env;

// const extractBearerToken = (header) => header.replace('Bearer ', '');

/* module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    // console.log(err);
    if (err instanceof JsonWebTokenError) {
      next(new UnauthorizedError('Необходима авторизация'));
    } else {
      next(err);
    }
  }
  // req.user = { _id: '643941994ffb7ea7616ac7f8' };
  req.user = payload;
  console.log(payload);

  next();
}; */

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
