const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "An Employee Must be there to recieve message"],
    },
    task: {
      type: String,
      required: [true, "No Task Provided"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
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
module.exports = mongoose.model("Task", TaskSchema);
