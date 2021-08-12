//createone message on the databse through this schema, this encrypts the messages
const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    default: null,
  },
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
  type: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = MessageSchema;
