const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const createValidationError = (err, next, message, errName = 'ValidationError') => {
  if (err.name === errName) {
    return next(new ValidationError(message));
  }

  return next(err);
};

const isUserExist = (user, res) => {
  if (!user) {
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  }

  res.send(user);
};

module.exports = { createValidationError, isUserExist };
