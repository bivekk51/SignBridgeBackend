const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },          // Replaces `image`
  file_id: { type: String, required: true },
  dataset: { type: String, required: true },      // Replaces `language`
       // Optional, but useful
}, { timestamps: true });

module.exports = mongoose.model("Sign", signSchema);
