//teams scheam
const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Month Is Compulsory"],
    },
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
module.exports = mongoose.model("Team", TeamSchema);
