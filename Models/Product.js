let mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    barcode: {
      type: String
    },
    rawMaterials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RawMaterial',
      required: true
    },
    operatorNo: {
      type: Number,
      required: true
    },
    duration: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Machine',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Product', productSchema);
//type,count,machine
