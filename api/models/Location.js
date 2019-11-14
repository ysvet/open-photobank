const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const LocationSchema = new mongoose.Schema({
  locationID: {
    type: Number,
    unique: true
  },
  locationName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

LocationSchema.plugin(autoIncrement.plugin, {
  model: 'Location',
  field: 'locationID',
  startAt: 100000,
  incrementBy: 1
});

module.exports = Location = mongoose.model('location', LocationSchema);
