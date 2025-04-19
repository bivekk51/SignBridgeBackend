const PDF = require('../models/PDFModels');

const uploadPDF = async (req, res) => {
  try {
    const { title, language, basis } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newPDF = new PDF({
      title,
      language,
      basis,
      pdf: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newPDF.save();
    res.status(201).json({ message: "PDF uploaded successfully" });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find({}, 'title language theme uploadedAt');
    res.status(200).json(pdfs);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve PDFs" });
  }
};

const getPDFById = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "PDF not found" });

    res.contentType(pdf.pdf.contentType);
    res.send(pdf.pdf.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching PDF" });
  }
};

module.exports = { uploadPDF, getAllPDFs, getPDFById };
