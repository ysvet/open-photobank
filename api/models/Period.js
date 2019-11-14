const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const PeriodSchema = new mongoose.Schema({
  periodID: {
    type: Number,
    unique: true
  },
  periodName: {
    type: String,
    required: true
  }
});

PeriodSchema.plugin(autoIncrement.plugin, {
  model: 'Period',
  field: 'periodID',
  startAt: 100000,
  incrementBy: 1
});

module.exports = Period = mongoose.model('period', PeriodSchema);
