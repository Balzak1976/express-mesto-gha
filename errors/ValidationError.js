const http2 = require('node:http2');

const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = ValidationError;
