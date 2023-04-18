const http2 = require('node:http2');
const mongoose = require('mongoose');
const { handleNotFoundError } = require('../errors/handleNotFoundError');
const Card = require('../models/card');

const { ValidationError, CastError } = mongoose.Error;

const CREATED = http2.constants.HTTP_STATUS_CREATED; // 201
const BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400

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
    .catch((err) => {
      if (err instanceof ValidationError) {
        next({
          statusCode: BAD_REQUEST,
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        next(err);
      }
    });
};

const delCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => { handleNotFoundError(card, res, 'Карточка с указанным _id не найдена.'); })
    .catch((err) => {
      if (err instanceof CastError) {
        res.status(BAD_REQUEST).send({ message: 'Передан некорректный _id карточки' });
      } else {
        next(err);
      }
    });
};

function likeDislikeCard(isLike) {
  return (req, res, next) => {
    const updateOperator = isLike
      ? { $addToSet: { likes: req.user._id } }
      : { $pull: { likes: req.user._id } };

    const errMessage = `Переданы некорректные данные для ${
      isLike ? 'постановки лайка' : 'снятия лайка'
    }.`;

    Card.findByIdAndUpdate(req.params.cardId, updateOperator, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => {
        handleNotFoundError(card, res, 'Передан несуществующий _id карточки.');
      })
      .catch((err) => {
        if (err instanceof CastError) {
          res.status(BAD_REQUEST).send({
            message: errMessage,
          });
        } else {
          next(err);
        }
      });
  };
}

const likeCard = likeDislikeCard(true);

const dislikeCard = likeDislikeCard(false);

module.exports = {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
};
