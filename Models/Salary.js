//salary schema on databse 
const mongoose = require("mongoose");
const SalarySchema = new mongoose.Schema(
  {
    month: {
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
module.exports = mongoose.model("Salary", SalarySchema);
