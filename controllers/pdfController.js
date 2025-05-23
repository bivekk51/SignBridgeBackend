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
    const pdfs = await PDF.find({}, 'title language basis uploadedAt');
    
    const pdfsWithLinks = pdfs.map(pdf => ({
      _id: pdf._id,
      title: pdf.title,
      language: pdf.language,
      basis: pdf.basis,
      uploadedAt: pdf.uploadedAt,
      downloadUrl: `${req.protocol}://${req.get('host')}/api/pdfs/${pdf._id}`  // <- This is important
    }));

    res.status(200).json(pdfsWithLinks);
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


const updatePDF = async (req, res) => {
  try {
    const { title, language, basis } = req.body;
    const updateData = { title, language, basis };

  
    if (req.file) {
      updateData.pdf = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedPDF = await PDF.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedPDF) return res.status(404).json({ message: "PDF not found" });

    res.status(200).json({ message: "PDF updated successfully", pdf: updatedPDF });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update PDF" });
  }
};

const deletePDF = async (req, res) => {
  try {
    const deletedPDF = await PDF.findByIdAndDelete(req.params.id);
    if (!deletedPDF) return res.status(404).json({ message: "PDF not found" });

    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete PDF" });
  }
};

module.exports = {
  uploadPDF,
  getAllPDFs,
  getPDFById,
  updatePDF,
  deletePDF
};
