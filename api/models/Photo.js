const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const PhotoSchema = new mongoose.Schema({
  photoID: {
    type: Number,
    unique: true
  },
  imgUrl: {
    type: String
  },
  photoFileName: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  categoryID: {
    type: Number
  },
  categoryName: {
    type: String
  },
  categoryID2: {
    type: Number
  },
  categoryName2: {
    type: String
  },
  categoryID3: {
    type: Number
  },
  categoryName3: {
    type: String
  },
  locationID: {
    type: Number
  },
  locationName: {
    type: String
  },
  contributorID: {
    type: Number
  },
  contributorName: {
    type: String
  },
  contributorWeb: {
    type: String
  },
  source: {
    type: String
  },
  author: {
    type: String
  },
  sourceWeb: {
    type: String
  },
  albumID: {
    type: Number
  },
  albumName: {
    type: String
  },
  albumInfo: {
    type: String
  },
  periodID: {
    type: Number
  },
  periodName: {
    type: String
  },
  license: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  imgSize: {
    type: Number
  }
});

PhotoSchema.plugin(autoIncrement.plugin, {
  model: 'Photo',
  field: 'photoID',
  startAt: 100000,
  incrementBy: 1
});

PhotoSchema.index(
  {
    title: 'text',
    description: 'text',
    albumInfo: 'text',
    author: 'text',
    source: 'text'
  },
  { default_language: 'english' }
);

module.exports = Photo = mongoose.model('photo', PhotoSchema);
