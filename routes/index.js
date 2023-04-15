const routes = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { doesUrlExist, handleErrors } = require('../middlewares/errors');

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use(doesUrlExist);

routes.use(handleErrors);

module.exports = routes;
