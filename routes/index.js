const routes = require('express').Router();
const express = require('express');
const { errors } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');

const signupValidate = require('../middlewares/signupValidate');
const signinValidate = require('../middlewares/signinValidate');
const auth = require('../middlewares/auth');
const { handleNotFoundUrl, handleErrors } = require('../middlewares/errors');

// ==========================================================================

// registration route
routes.post('/signup', express.json(), signupValidate, createUser);
// authorization route
routes.post('/signin', express.json(), signinValidate, login);
routes.use(auth);

// inner routes
routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use(handleNotFoundUrl);

// handler celebrate validator
routes.use(errors());
// handler commune errors
routes.use(handleErrors);

module.exports = routes;
