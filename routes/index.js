const routes = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const { handleNotFoundUrl, handleErrors } = require('../middlewares/errors');

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);
routes.use(handleNotFoundUrl);

routes.use(handleErrors);

module.exports = routes;
