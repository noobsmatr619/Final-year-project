let mongoose = require("mongoose");

const rawMaterialSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Please Add Type"],
    },
    name: {
      type: String,
    },
    count: {
      type: Number,
      default: 1,
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("RawMaterial", rawMaterialSchema);
//type,count,machine
