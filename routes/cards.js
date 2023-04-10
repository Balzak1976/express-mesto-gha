const express = require('express');

const cardsRoutes = express.Router();

const { getCards, createCard, delCard } = require('../controllers/cards');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', express.json(), createCard);

cardsRoutes.delete('/:cardId', delCard);

module.exports = cardsRoutes;
