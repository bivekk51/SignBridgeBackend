// models/signword.js
const mongoose = require('mongoose');

const signwordSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Signword', signwordSchema);
