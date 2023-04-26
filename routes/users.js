const express = require('express');

const { userUpdateValidate, userIdValidate } = require('../middlewares/userValidate');

const userRoutes = express.Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', userIdValidate, getUserById);

userRoutes.patch('/me', express.json(), userUpdateValidate, updateUser);

userRoutes.patch('/me/avatar', express.json(), userUpdateValidate, updateUser);

module.exports = userRoutes;
