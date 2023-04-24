const http2 = require('node:http2');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { handleNotFoundError, handlerMsgValidator } = require('../errors/handlers');
const { createToken } = require('../utils/jwt');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../models/user');

const { ValidationError, CastError } = mongoose.Error;

const OK = http2.constants.HTTP_STATUS_OK; // 200
const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const userNotFoundMsg = 'Пользователь по указанному _id не найден.';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => { handleNotFoundError(user, res, userNotFoundMsg); })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err instanceof ValidationError) {
        // передаём кастомный message от валидатора mongoose
        next(new BadRequestError(handlerMsgValidator(err)));
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
      handleNotFoundError(user, res, userNotFoundMsg);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        // передаём кастомный message от валидатора mongoose
        next(new BadRequestError(handlerMsgValidator(err)));
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
      handleNotFoundError(user, res, userNotFoundMsg);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        // передаём кастомный message от валидатора mongoose
        next(new BadRequestError(handlerMsgValidator(err)));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const JWT = createToken({ _id: user.id });

      return res.status(OK).send({ JWT });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        // передаём кастомный message от валидатора mongoose
        next(new BadRequestError(handlerMsgValidator(err)));
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
  login,
};
