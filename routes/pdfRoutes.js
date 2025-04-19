const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadPDF, getAllPDFs, getPDFById } = require('../controllers/pdfController');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), uploadPDF);
router.get('/', getAllPDFs);
router.get('/:id', getPDFById);

module.exports = router;
