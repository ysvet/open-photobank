const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const AlbumSchema = new mongoose.Schema({
  albumID: {
    type: Number,
    unique: true
  },
  albumName: {
    type: String,
    required: true
  },
  // photos: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Photo'
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});

AlbumSchema.plugin(autoIncrement.plugin, {
  model: 'Album',
  field: 'albumID',
  startAt: 100000,
  incrementBy: 1
});

module.exports = Album = mongoose.model('album', AlbumSchema);
