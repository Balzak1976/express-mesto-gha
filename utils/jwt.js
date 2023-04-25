const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env;

module.exports.createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
