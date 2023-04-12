const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const createValidationError = (err, next, message, errName = 'ValidationError') => {
  if (err.name === errName) {
    next(new ValidationError(message));
  } else {
    next(err);
  }
};

const isUserExist = (user, res) => {
  if (!user) {
    throw new NotFoundError('Пользователь по указанному _id не найден.');
  }

  res.send(user);
};

const isCardExist = (card, res, message) => {
  if (!card) {
    throw new NotFoundError(message);
  }

  res.send(card);
};

module.exports = { createValidationError, isUserExist, isCardExist };
