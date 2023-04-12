const routes = require('express').Router();

const userRoutes = require('./users');
const cardsRoutes = require('./cards');

routes.use('/users', userRoutes);
routes.use('/cards', cardsRoutes);

routes.use((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  console.log('errName: ', name);

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

module.exports = routes;
