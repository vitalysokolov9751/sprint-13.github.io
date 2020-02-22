const mongoose = require('mongoose');
const Card = require('../models/card');

const { ObjectId } = mongoose.Types;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) {
    res.status(404).send({ message: `Нет карточки с id ${cardId}` });
    return;
  }
  Card.findOneAndDelete({ _id: cardId })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) {
    res.status(404).send({ message: `Нет карточки с id ${cardId}` });
    return;
  }
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  if (!ObjectId.isValid(cardId)) {
    res.status(404).send({ message: `Нет карточки с id ${cardId}` });
    return;
  }
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Нет карточки с id ${cardId}` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};
