const express = require('express');

const userRoutes = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me', express.json(), updateUser);

userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
