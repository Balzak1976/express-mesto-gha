const express = require('express');

const { cardValidate, cardIdValidate } = require('../middlewares/cardValidate');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), cardValidate, createCard);

cardsRoutes.delete('/:cardId', cardIdValidate, delCard);

cardsRoutes.put('/:cardId/likes', express.json(), cardIdValidate, likeCard);

cardsRoutes.delete('/:cardId/likes', express.json(), cardIdValidate, dislikeCard);

module.exports = cardsRoutes;
