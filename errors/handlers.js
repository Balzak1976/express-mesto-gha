const http2 = require('node:http2');
const NotFoundError = require('./NotFoundError');

const OK = http2.constants.HTTP_STATUS_OK;

const handleNotFoundError = (data, res, message) => {
  if (!data) {
    throw new NotFoundError(message);
  } else {
    res.status(OK).send(data);
  }
};

const handlerMsgValidator = (err) => `${Object.values(err.errors).map((error) => error.message).join(', ')}`;

module.exports = { handleNotFoundError, handlerMsgValidator };
