const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JsonWebTokenError } = jwt;

const { SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new UnauthorizedError('Необходима авторизация 1'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, SECRET_KEY);
    console.log(payload);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      next(new UnauthorizedError('Необходима авторизация 2'));
    } else {
      next(err);
    }
  }
  // req.user = { _id: '6435395abbde9a409726b391' };
  req.user = payload;

  next();
};
