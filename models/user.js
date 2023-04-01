const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    require: true,
  },
});

module.exports = model('user', userSchema);
