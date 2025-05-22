const express = require('express');
const multer = require('multer');
const path = require('path');
const excelSheetController = require('../controller/excelSheetController');
const router = express.Router();
const storage = multer.memoryStorage();
// const upload = multer({ storage });
// console.log(storage)
const upload = multer({ storage });
router.post('/upload', upload.single('file'),excelSheetController.uploadCSV);
router.get('/search-policy',excelSheetController.searchPoliciesByUserName );
router.get('/aggregate/by/user', excelSheetController.getAggregatedPoliciesByUser);
module.exports = router;