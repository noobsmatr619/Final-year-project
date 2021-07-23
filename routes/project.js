const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  assignProject,
} = require("./../controllers/project");
const { protect } = require("./../middleware/auth");
router.post("/createProject", protect, createProject);
router.post("/assignProject", protect, assignProject);
router.get("/getAllProjects", protect, getAllProjects);
module.exports = router;
