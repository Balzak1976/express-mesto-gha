const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const createCard = (req, res) => {
  const { _id: owner } = req.user;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const delCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

const addLike = (req, res) => {
  const { _id: owner } = req.user;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports = {
  getCards, createCard, delCard, addLike,
};
