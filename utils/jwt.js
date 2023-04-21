const jwt = require('jsonwebtoken');

module.exports.createToken = (payload) => jwt.sign(payload, 'some-secret-key', { expiresIn: '7d' });
