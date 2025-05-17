const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadPDF,
  getAllPDFs,
  getPDFById,
  updatePDF,
  deletePDF
} = require('../controllers/pdfController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), uploadPDF);
router.get('/', getAllPDFs);
router.get('/:id', getPDFById);
router.put('/:id', upload.single('pdf'), updatePDF);
router.delete('/:id', deletePDF);

module.exports = router;
