const express = require('express');
const multer = require('multer');
const path = require('path');
const excelSheetController = require('../controller/excelSheetController');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const validateCSVFile = (req, res, next) => {
    if (!req.file || !req.file.originalname.endsWith('.csv')) {
      return res.status(400).json({ message: 'Only CSV files are allowed' });
    }
    next();
  };
router.post('/upload', upload.single('file'),validateCSVFile,excelSheetController.uploadCSV);
router.get('/search-policy',excelSheetController.searchPoliciesByUserName );
router.get('/aggregate/by/user', excelSheetController.getAggregatedPoliciesByUser);
module.exports = router;