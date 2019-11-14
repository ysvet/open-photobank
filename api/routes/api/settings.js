const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const Settings = require('../../models/Settings');
const { check, validationResult } = require('express-validator');

//@route POST api/settings
//@desc Get showing language bar status
//@access Public

router.get('/language', async (req, res) => {
  try {
    const showLanguageBar = await Settings.find({}, 'showLanguageBar');
    res.json(showLanguageBar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// //@route POST api/album
// //@desc Add or update album
// //@access Private

// router.post('/', auth, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { albumID, albumName } = req.body;

//   // Build album object kk
//   const albumFields = {};

//   if (albumID) albumFields.albumID = albumID;
//   if (albumName) albumFields.albumName = albumName;

//   try {
//     let album = await Album.findOne({
//       albumID: albumID
//     });
//     if (album) {
//       //update
//       album = await Album.findOneAndUpdate(
//         { albumID: albumID },
//         { $set: albumFields },
//         { new: true }
//       );
//       return res.json(album);
//     }
//     // create
//     album = new Album(albumFields);
//     await album.save();
//     res.json(album);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// //@route GET api/album
// //@desc Get all albums
// //@access Public

// router.get('/', async (req, res) => {
//   try {
//     const album = await Album.find().sort({ date: +1 });
//     res.json(album);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// //@route GET api/album/:album_id
// //@desc Get an album by albumID
// //@access Public

// router.get('/:album_id', async (req, res) => {
//   try {
//     const album = await Album.findOne({
//       albumID: req.params.album_id
//     });
//     if (!album) return res.status(400).json({ msg: 'Album not found' });
//     res.json(album);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Album not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

// //@route GET api/album/:album_id/photos
// //@desc Get an album with it's photos by albumID
// //@access Public

// router.get('/:album_id/photos', async (req, res) => {
//   try {
//     const album = await Album.findOne({
//       albumID: req.params.album_id
//     });

//     if (!album) return res.status(400).json({ msg: 'Album not found' });

//     const albumPhotos = await Photo.find({
//       albumID: req.params.album_id
//     });
//     res.json({ albumPhotos: albumPhotos, album: album });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Album not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

// //@route DELETE api/album/:album_id
// //@desc Delete a album
// //@access Private

// router.delete('/:album_id', auth, async (req, res) => {
//   try {
//     const album = await Album.findOne({
//       albumID: req.params.album_id
//     });
//     if (!album) {
//       return res.status(404).json({ msg: 'Album not found' });
//     }
//     await album.remove();

//     res.json({ msg: 'Album removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Album not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
