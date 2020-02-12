const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(err.status || 400).send({ message: `${err.message || 400}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || 500}` }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.body;
  Card.findOneAndDelete({ _id: cardId })
    .orFail(() => ({ message: `Нет карточки с id ${cardId}`, status: 404 }))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.status || 400).send({ message: `${err.message || 400}` }));
};

module.exports.likeCard = (req) => {
  const { cardId } = req.body;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true });
};

module.exports.dislikeCard = (req) => {
  const { cardId } = req.body;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true });
};
