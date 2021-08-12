//shcema to create health  in the database 

const mongoose = require('mongoose');
const HealthSchema = new mongoose.Schema({
  Injury: {
    type: String,
    required: true
  },
  FirstAid: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  Equipment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bodyPart: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  signature: {
    type: String
  }
});
module.exports = mongoose.model('Health', HealthSchema);
