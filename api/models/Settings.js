const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  showLanguageBar: {
    type: Boolean,
    default: false
  }
});

module.exports = Settings = mongoose.model('settings', SettingsSchema);
