const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${err.message}` });
      } else if (err.name.indexOf('Cast to ObjectId failed')) {
        res.status(404).send({ message: `Нет пользователя с id ${userId}` });
      } else {
        res.status(500).send({ message: `${err.message}` });
      }
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
