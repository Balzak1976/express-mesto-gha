const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const createUser = (req, res) => {
  const { avatar, name, about } = req.body;

  User.create({ avatar, name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const updateUser = (req, res) => {
  const { _id: id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const updateAvatar = (req, res) => {
  const { _id: id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
