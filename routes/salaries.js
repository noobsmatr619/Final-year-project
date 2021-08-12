//simple salary click handler 
const express = require("express");
const router = express.Router();
const { paySalary, getSalaries } = require("./../controllers/salaries");
const { protect } = require("./../middleware/auth");
router.get("/getSalaries", protect, getSalaries);
router.post("/paySalary", protect, paySalary);

module.exports = router;
