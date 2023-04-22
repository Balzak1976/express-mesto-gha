const routes = require('express').Router();
const express = require('express');

const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleNotFoundUrl, handleErrors } = require('../middlewares/errors');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

routes.use(auth);
routes.post('/signin', express.json(), login);
routes.post('/signup', express.json(), createUser);
routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use(handleNotFoundUrl);

routes.use(handleErrors);

module.exports = routes;
