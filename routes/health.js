const express = require('express');
const router = express.Router();
const { multerUploads, dataUri } = require('../upload');
// api for health actions 
const {
  createAccident,
  getAccident,
  getlLocationAccident,
  getSingleHealth,
  updateSingleHealth
} = require('./../controllers/health');

const { protect } = require('./../middleware/auth');
router.post('/createAccident', multerUploads, protect, createAccident);
router.get('/getAccident', protect, getAccident);
router.get('/getlLocationAccident', protect, getlLocationAccident);
router.get('/accident/:id', protect, getSingleHealth);
router.put('/accidentupdate/:id', protect, updateSingleHealth);
module.exports = router;
