const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  label: { type: String, required: true },
  language: { type: String, required: true,default:'asl' }, // "asl" or "nsl"
  image: { type: String, required: true },    // base64 string of the image
  type:{type:String,default: 'letter'}
}, { timestamps: true });

const Sign = mongoose.model("Sign", signSchema);
module.exports = Sign;
