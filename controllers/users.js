const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.body;
  User.findById(userId)
    .orFail(() => ({ message: 'Нет пользователя с таким id', status: 404 }))
    .then((user) => res.send({ user }))
    .catch((err) => res.status(err.status || 400).send({ message: `${err.message || 400}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(err.status || 500).send({ message: `${err.message || err}` }));
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
