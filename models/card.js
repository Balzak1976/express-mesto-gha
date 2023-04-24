const mongoose = require('mongoose');
const validator = require('validator');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Поле названия должно быть заполнено'],
    minlength: [2, 'Название должно быть не короче 2 симв.'],
    maxlength: [30, 'Название должно быть не длиннее 30 симв.'],
  },
  link: {
    type: String,
    required: [true, 'Поле URL картинки должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Введите URL картинки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

cardSchema.statics.delJustOwnCard = function foo(cardId, userId) {
  return this.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Нет доступа на удаление чужой карточки');
      } else {
        return card._id;
      }
    })
    .then((id) => this.findByIdAndRemove(id));
};

module.exports = model('card', cardSchema);
