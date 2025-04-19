const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  basis: {
    type: String,
    required: true
  },
  pdf: {
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

const Pdf = mongoose.model("Pdf", pdfSchema);
module.exports = Pdf;
