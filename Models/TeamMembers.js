//ccreate teammember creae teams on the schema 
const mongoose = require("mongoose");
const TeamMemeberSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Member Id Is Required"],
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team Id Is Required"],
    },
    memberName: {
      type: String,
      required: [true, "Member Name Is Required"],
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
module.exports = mongoose.model("Members", TeamMemeberSchema);
