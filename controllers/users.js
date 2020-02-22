const mongoose = require('mongoose');
const User = require('../models/user');

const { ObjectId } = mongoose.Types;

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  if (!ObjectId.isValid(userId)) {
    res.status(404).send({ message: `Нет пользователя с id ${userId}` });
    return;
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Нет пользователя с id ${userId}` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${err.message}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
    });
};

module.exports.patchProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(err.status || 400).send({ message: `${err.message || err}` }));
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(err.status || 400).send({ message: `${err.message || err}` }));
};
