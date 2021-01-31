let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
  displayName: { type: String },
  admin: {
    type: Boolean,
    default: false,
  },
  manager: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Boolean,
    default: false,
  },
  
  resettoken: { type: String },
  expiretoken: { type: Date },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
