const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя не может быть пустым'],
    minlength: [2, 'Имя пользователя должно состоять не менее чем из 2-х символов'],
    maxlength: [30, 'Имя пользователя должно иметь не более 30-ти символов в длину'],
  },
  about: {
    type: String,
    required: [true, 'Описание пользователя не может быть пустым'],
    minlength: [2, 'Описание пользователя должно состоять не менее чем из 2-х символов'],
    maxlength: [30, 'Описание пользователя должно иметь не более 30-ти символов в длину'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (str) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(str),
      message: (props) => `${props.value} - url не действителен!`,
    },
    required: [true, 'Аватар пользователя должен быть задан'],
  },
});

module.exports = mongoose.model('user', userSchema);
