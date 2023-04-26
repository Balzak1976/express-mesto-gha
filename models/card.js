const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { urlRegExp } = require('../utils/regExp');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegExp.test(v),
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
