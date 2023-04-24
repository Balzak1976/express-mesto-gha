const express = require('express');

const userRoutes = express.Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me', express.json(), updateUser);

userRoutes.patch('/me/avatar', express.json(), updateUser);

module.exports = userRoutes;
