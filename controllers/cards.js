const Card = require('../models/card');
const { createValidationError } = require('../utils/utils');

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
    .then((card) => res.send(card))
    .catch(next);
};

const addLike = (req, res) => {
  const { _id: owner } = req.user;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports = {
  getCards,
  createCard,
  delCard,
  addLike,
  likeCard,
  dislikeCard,
};
