const http2 = require('node:http2');
const NotFoundError = require('./NotFoundError');
const CastError = require('./CastError');
const ValidationError = require('./ValidationError');

// const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST;
// const NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND;
// const SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
const OK = http2.constants.HTTP_STATUS_OK;
// const CREATED = http2.constants.HTTP_STATUS_CREATED;

const handleNotFoundError = (data, res, message) => {
  if (!data) {
    throw new NotFoundError(message);
  } else {
    res.status(OK).send(data);
  }
};

const handleCastError = (err, next, message) => {
  if (err.name === 'CastError') {
    next(new CastError(message));
  } else {
    next(err);
  }
};

const handleValidationError = (err, next, message) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(message));
  } else {
    next(err);
  }
};

const handleServerError = (err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  console.log('errName: ', name);

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
};

module.exports = {
  handleNotFoundError,
  handleCastError,
  handleValidationError,
  handleServerError,
};
