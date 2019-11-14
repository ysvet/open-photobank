const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const ContributorSchema = new mongoose.Schema({
  contributorID: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  web: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ContributorSchema.plugin(autoIncrement.plugin, {
  model: 'Contributor',
  field: 'contributorID',
  startAt: 100000,
  incrementBy: 1
});

module.exports = Contributor = mongoose.model('contributor', ContributorSchema);
