const { celebrate, Joi } = require('celebrate');

const pwdRegExp = /^[!-z]{8,30}$/;

// registration
module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле должно быть валидным email',
      }),
    password: Joi.string().min(8).required().pattern(pwdRegExp)
      .message('Поле пароля должно содержать a-z, A-Z, и 0-9')
      .messages({
        'string.min': 'Пароль должен быть не короче 8 симв.',
        'string.empty': 'Поле пароля должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя должно быть не короче 2 симв.',
        'string.max': 'Имя должно быть не длиннее 30 симв.',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Текст о себе должен быть не короче 2 симв.',
        'string.max': 'Текст о себе должен быть не длиннее 30 симв.',
      }),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] })
      .messages({
        'string.url': 'Введите URL аватара',
      }),
  }),
});
