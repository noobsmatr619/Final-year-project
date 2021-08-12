//shcema to create chat in the database 
const mongoose = require("mongoose");
const Message = require("./Message");
const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A sender Must be there to recieve message"],
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A reciever Must be there to recieve message"],
    },
    lastMessageText: {
      type: String,
    },
    lastMessageTime: {
      type: Date,
    },
    messages: [Message],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
module.exports = mongoose.model("Chat", ChatSchema);
