const { celebrate, Joi } = require('celebrate');

const { urlRegExp } = require('../utils/regExp');

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Название должно быть не короче 2 симв.',
        'string.max': 'Название должно быть не длиннее 30 симв.',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().pattern(urlRegExp)
      .message('Введите URL места')
      .messages({
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().alphanum().length(24) }),
});

module.exports = { cardValidate, cardIdValidate };
