//shcema to create machines in the database 

let mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Name"],
    },
    model: {
      type: String,
      required: [true, "Please Add Model Number"],
    },
    build: {
      type: String,
      required: [true, "Please Add Build"],
    },
    status: {
      type: Number,
      default: 1,
    },
    target: {
      type: Number,
      default: 1,
    },
    stopTime: {
      type: Date,
      default: null,
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

module.exports = mongoose.model("Machine", machineSchema);
