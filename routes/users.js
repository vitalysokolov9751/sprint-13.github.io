const users = require('express').Router();
const {
  getUsers, getUser, createUser, patchProfile, patchAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/:userId', getUser);
users.post('/', createUser);
users.patch('/me', patchProfile);
users.patch('/me/avatar', patchAvatar);

module.exports = users;
