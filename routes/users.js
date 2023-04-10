const express = require('express');

const userRoutes = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.post('/', express.json(), createUser);

userRoutes.patch('/me', express.json(), updateUser);

userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
