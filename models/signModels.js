const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  label: { type: String, required: true },           // e.g., "A", "Hello"
  language: { type: String, required: true },        // e.g., "ASL", "NSL"
  image: { type: String, required: true },           // Google Drive URL
  description: { type: String },                     // Optional meaning or notes
}, { timestamps: true });

module.exports = mongoose.model("Sign", signSchema);
