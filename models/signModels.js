const mongoose = require("mongoose");

const signSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },          
  file_id: { type: String, required: true },
  dataset: { type: String, required: true },    
       // Optional, but useful
}, { timestamps: true });

const Sign = mongoose.model("Sign", signSchema);
module.exports=Sign