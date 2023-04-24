const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле должно быть валидным email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [2, 'Пароль должен быть не короче 2 симв.'],
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: [2, 'Имя должно быть не короче 2 симв.'],
    maxlength: [30, 'Имя должно быть не длиннее 30 симв.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: [2, 'Текст о себе должен быть не короче 2 симв.'],
    maxlength: [30, 'Текст о себе должен быть не длиннее 30 симв.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введите URL аватара',
    },
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function foo(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw (new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw (new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = model('user', userSchema);
