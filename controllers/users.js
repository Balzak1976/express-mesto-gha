const User = require('../models/user');
const { createValidationError, isUserExist } = require('../utils/utils');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => { isUserExist(user, res); })
    .catch((err) => { createValidationError(err, next, 'Невалидный id', 'CastError'); });
};

const createUser = (req, res, next) => {
  const { avatar, name, about } = req.body;

  User.create({ avatar, name, about })
    .then((user) => res.send(user))
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные при создании пользователя.'); });
};

const updateUser = (req, res, next) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => { isUserExist(user, res); })
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные при обновлении профиля.'); });
};

const updateAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => { isUserExist(user, res); })
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные при обновлении аватара.'); });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
