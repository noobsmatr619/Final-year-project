//create project schema to cereate produtc on the database, take care on the required fields 
const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    project: {
      type: String,
      required: [true, "No project Provided"],
    },
    description: { type: String, required: [true, "No Description Provided"] },
    dueDate: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isAssigned: {
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
module.exports = mongoose.model("Project", ProjectSchema);
