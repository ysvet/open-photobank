const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const CategorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    unique: true
  },
  categoryName: {
    type: String,
    required: true
  },
  categoryDescription: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'categoryID',
  startAt: 100000,
  incrementBy: 1
});

module.exports = Category = mongoose.model('category', CategorySchema);
