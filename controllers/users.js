const http2 = require('node:http2');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/user');

// const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
// const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
// const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const OK = http2.constants.HTTP_STATUS_OK;
const CREATED = http2.constants.HTTP_STATUS_CREATED;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { avatar, name, about } = req.body;

  User.create({ avatar, name, about })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.status(OK).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
