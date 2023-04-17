const http2 = require('node:http2');

const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND; // 404
const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500

const handleNotFoundUrl = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'По указанному url ничего нет' });
};

const handleErrors = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
};

module.exports = { handleNotFoundUrl, handleErrors };
