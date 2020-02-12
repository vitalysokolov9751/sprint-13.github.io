const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('card')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || 500}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || 500}` }));
};

module.exports.deleteCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log('cardId: ', req.params.cardId);
  Card.findOneAndDelete({ _id: req.params.cardId })
    .orFail(() => ({ message: `Нет карточки с id ${req.params.cardId}`, status: 404 }))
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || 500}` }));
};

module.exports.likeCard = (req) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
};

module.exports.dislikeCard = (req) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true });
};
