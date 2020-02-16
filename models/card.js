const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя карточки должно быть задано'],
    minlength: [2, 'Имя карточки должно состоять не менее чем из 2-х символов'],
    maxlength: [30, 'Имя карточки должно иметь не более 30-ти символов в длину'],
  },
  link: {
    type: String,
    validate: {
      validator: (str) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(str),
      message: (props) => `${props.value} - url не действителен!`,
    },
    required: [true, 'Ссылка карточки должна быть задана'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Создатель карточки должен быть задан'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
  default: [],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
