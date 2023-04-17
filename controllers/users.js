const http2 = require('node:http2');
const mongoose = require('mongoose');
const { handleNotFoundError } = require('../errors/handleNotFoundError');
const User = require('../models/user');

const { ValidationError, CastError } = mongoose.Error;

const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      handleNotFoundError(user, res, 'Пользователь по указанному _id не найден.');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Невалидный _id пользователя' });
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
      if (err instanceof ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        next(err);
      }
    });
};

function updateUserById(errMessage) {
  return (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        handleNotFoundError(
          user,
          res,
          'Пользователь по указанному _id не найден.',
        );
      })
      .catch((err) => {
        if (err instanceof ValidationError) {
          res.status(BAD_REQUEST).send({ message: errMessage });
        } else {
          next(err);
        }
      });
  };
}

const updateUser = updateUserById('Переданы некорректные данные при обновлении профиля.');

const updateAvatar = updateUserById('Переданы некорректные данные при обновлении аватара.');

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
