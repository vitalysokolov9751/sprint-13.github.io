const users = require('express').Router();
const path = require('path');
const readDataFromFile = require('./helpers.js');

users.get('/', async (req, res) => {
  try {
    const data = await readDataFromFile(path.resolve(__dirname, '../data/users.json'));
    return res.send(JSON.parse(data));
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// eslint-disable-next-line consistent-return
users.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line no-unused-vars
    let data = await readDataFromFile(path.resolve(__dirname, '../data/users.json'));
    data = JSON.parse(data);
    const user = data.find((curruser) => curruser._id === id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: `Нет пользователя с id ${id}` });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

module.exports = users;
