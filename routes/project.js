const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  assignProject,
  completedProject
} = require('./../controllers/project');
const { protect } = require('./../middleware/auth');
router.post('/createProject', protect, createProject);
router.post('/assignProject', protect, assignProject);
router.get('/getAllProjects', protect, getAllProjects);
router.get('/completedProject', protect, completedProject);
module.exports = router;
