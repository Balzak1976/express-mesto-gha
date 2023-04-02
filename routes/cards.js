const router = require('express').Router();

const { getCards, createCard, delCard } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', delCard);

module.exports = router;
