const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cards = require('./routes/cards');
const users = require('./routes/users');
const pages = require('./routes/pages');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '5e4294999e02fc09c0491e41',
  };
  next();
});
app.use('/cards', cards);
app.use('/users', users);
app.use('*', pages);
app.listen(PORT);
