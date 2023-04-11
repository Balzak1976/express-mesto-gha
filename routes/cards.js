const express = require('express');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:cardId', delCard);

cardsRoutes.put('/:cardId/likes', express.json(), likeCard);

cardsRoutes.delete('/:cardId/likes', express.json(), dislikeCard);

module.exports = cardsRoutes;
