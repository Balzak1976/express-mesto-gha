const http2 = require('node:http2');

const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
