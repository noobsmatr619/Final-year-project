const express = require('express');
const router = express.Router();
const {
  addNewRawMaterial,
  getAllRawMaterials,
  putInStock,
  getAllRawMaterialsPrices
} = require('./../controllers/rawMaterial');
router.post('/addNewRawMaterial', addNewRawMaterial);
router.post('/putInStock', putInStock);
router.get('/getAllRawMaterials', getAllRawMaterials);
router.get('/getAllRawMaterialsPrices', getAllRawMaterialsPrices);
module.exports = router;
