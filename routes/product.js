// handle product routes 
const express = require('express');
const router = express.Router();
const { uploader } = require('../config/cloudinaryConfiguration');

const {
  createProduct,
  getAllProducts,
  addProductByMachine,
  getProductsProduced,
  rejectProductsCount,
  getProductsDone,
  createBarCode
} = require('./../controllers/product');
router.post('/createProduct', createProduct);
router.post('/addProductByMachine', addProductByMachine);
router.post('/rejectProductsCount', rejectProductsCount);

router.get('/createBarCode', createBarCode);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductsProduced', getProductsProduced);
router.get('/getProductsDone', getProductsDone);
module.exports = router;
