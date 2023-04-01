const router = require('express').Router();

const User = require('../models/user');

/* GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */
