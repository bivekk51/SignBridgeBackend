const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  signtype: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
