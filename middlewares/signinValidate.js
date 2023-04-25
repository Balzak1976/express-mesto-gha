const { celebrate, Joi } = require('celebrate');

// authorization
module.exports = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.email': 'Поле должно быть валидным email',
      }),
    password: Joi.string().min(8).required().alphanum()
      .messages({
        'string.min': 'Пароль должен быть не короче 8 симв.',
        'string.empty': 'Поле пароля должно быть заполнено',
        'string.alphanum': 'Поле пароля должно содержать a-z, A-Z, and 0-9',
      }),
  }),
});
