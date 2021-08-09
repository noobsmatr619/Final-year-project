const express = require('express');
const router = express.Router();
const { multerUploads, dataUri } = require('../upload');

const {
  createAccident,
  getAccident,
  getlLocationAccident
} = require('./../controllers/health');

const { protect } = require('./../middleware/auth');
router.post('/createAccident', multerUploads, protect, createAccident);
router.get('/getAccident', protect, getAccident);
router.get('/getlLocationAccident', protect, getlLocationAccident);
module.exports = router;
