const routes = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

module.exports = routes;
