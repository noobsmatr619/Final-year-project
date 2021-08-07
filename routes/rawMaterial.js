const express = require("express");
const router = express.Router();
const {
  addNewRawMaterial,
  getAllRawMaterials,
  putInStock,
} = require("./../controllers/rawMaterial");
router.post("/addNewRawMaterial", addNewRawMaterial);
router.post("/putInStock", putInStock);
router.get("/getAllRawMaterials", getAllRawMaterials);
module.exports = router;
