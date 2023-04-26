const http2 = require('node:http2');
const { handleNotFoundError } = require('../errors/handlers');
const Card = require('../models/card');

const OK = http2.constants.HTTP_STATUS_OK; // 200
const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const cardNotFoundMsg = 'Передан несуществующий _id карточки.';

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.status(CREATED).send(card))
    .catch(next);
};

const delCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.delJustOwnCard(cardId, req.user._id)
    .then((card) => { res.status(OK).send(card); })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      handleNotFoundError(card, res, cardNotFoundMsg);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      handleNotFoundError(card, res, cardNotFoundMsg);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
