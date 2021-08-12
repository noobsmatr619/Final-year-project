//routes for tasks status 
const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  markCompleted,
} = require("./../controllers/task");
const { protect } = require("./../middleware/auth");
router.post("/createTask", protect, createTask);
router.post("/markCompleted", protect, markCompleted);
router.get("/getAllTasks", protect, getAllTasks);
module.exports = router;
