const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    privateid: { type: String },
    name: { type: String },
    email: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", MessageSchema);
