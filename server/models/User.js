const { Schema, model } = require('mongoose');
const book = require('./Book');

const userSchema = new Schema({
  
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
      trim: true
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },

    token: {
      type: String,
      required: true,
      unique: true,
      trim: true
  },

  savedBooks: {
    book: {
      image: String,
      title: String,
      link: String
    }
  }

});

module.exports = model('User', userSchema);
