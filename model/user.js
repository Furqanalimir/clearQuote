const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema)

