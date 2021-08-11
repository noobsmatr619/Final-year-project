const express = require("express");
const router = express.Router();
const {
  createTeam,
  getMyTeams,
  getAllTeams,
} = require("./../controllers/teams");
const { protect } = require("./../middleware/auth");
router.get("/getMyTeams", protect, getMyTeams);
router.get("/getAllTeams", protect, getAllTeams);
router.post("/createTeam", protect, createTeam);

module.exports = router;
