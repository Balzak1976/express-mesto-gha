const express = require('express');

const userValidate = require('../middlewares/userValidate');

const userRoutes = express.Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

userRoutes.get('/', userValidate, getUsers);

userRoutes.get('/me', userValidate, getCurrentUser);

userRoutes.get('/:userId', userValidate, getUserById);

userRoutes.patch('/me', express.json(), userValidate, updateUser);

userRoutes.patch('/me/avatar', express.json(), userValidate, updateUser);

module.exports = userRoutes;
