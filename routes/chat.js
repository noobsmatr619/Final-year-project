//required for chat 
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  sendMessage,
  getAllChats,
  getUserChat,
} = require("../controllers/chat");
//api routes for message acctions 
router.post("/sendMessage", protect, sendMessage);
router.get("/getAllChats", protect, getAllChats);
router.get("/getUserChat", protect, getUserChat);

module.exports = router;
