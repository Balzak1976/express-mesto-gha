const Card = require('../models/card');
const { createValidationError, isCardExist } = require('../utils/utils');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.send(card))
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные при создании карточки.'); });
};

const delCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => { isCardExist(card, res, 'Карточка с указанным _id не найдена.'); })
    .catch((err) => { createValidationError(err, next, 'Передан некорректный _id карточки', 'CastError'); });
};

const likeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => { isCardExist(card, res, 'Передан несуществующий _id карточки.'); })
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные для постановки лайка.', 'CastError'); });
};

const dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true, runValidators: true })
    .then((card) => { isCardExist(card, res, 'Передан несуществующий _id карточки.'); })
    .catch((err) => { createValidationError(err, next, 'Переданы некорректные данные для снятия лайка.', 'CastError'); });
};

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
