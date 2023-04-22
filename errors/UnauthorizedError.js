const http2 = require('node:http2');

const UNAUTHORIZED = http2.constants.HTTP_STATUS_UNAUTHORIZED; // 401

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
