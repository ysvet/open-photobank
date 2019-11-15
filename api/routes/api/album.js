const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');
const Album = require('../../models/Album');
const { check, validationResult } = require('express-validator');

//@route POST api/album
//@desc Add or update album
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { albumID, albumName } = req.body;

  // Build album object
  const albumFields = {};

  if (albumID) albumFields.albumID = albumID;
  if (albumName) albumFields.albumName = albumName;

  try {
    let album = await Album.findOne({
      albumID: albumID
    });
    if (album) {
      //update
      album = await Album.findOneAndUpdate(
        { albumID: albumID },
        { $set: albumFields },
        { new: true }
      );
      return res.json(album);
    }
    // create
    album = new Album(albumFields);
    await album.save();
    res.json(album);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/album/all
//@desc Get all albums with no pagination
//@access Public

router.get('/all', async (req, res) => {
  try {
    const albums = await Album.find().sort({ date: -1 });

    res.json({
      albums: albums
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/album
//@desc Get all albums with pagination
//@access Public

const ALBUMS_PER_PAGE = 40;

router.get('/', async (req, res) => {
  try {
    const page = +req.query.page || 1;

    const currentPage = page;

    const totalAlbums = await Album.find().countDocuments();

    const hasNextPage = ALBUMS_PER_PAGE * page < totalAlbums;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalAlbums / ALBUMS_PER_PAGE);

    const albums = await Album.find()
      .sort({ date: -1 })
      .skip((page - 1) * ALBUMS_PER_PAGE)
      .limit(ALBUMS_PER_PAGE);

    res.json({
      albums: albums,
      albumsPerPage: ALBUMS_PER_PAGE,
      totalAlbums: totalAlbums,
      currentPage: currentPage,
      hasNextPage: hasNextPage,
      nextPage: nextPage,
      hasPreviousPage: hasPreviousPage,
      lastPage: lastPage,
      previousPage: previousPage
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/album/:album_id
//@desc Get an album by albumID
//@access Public

router.get('/:album_id', async (req, res) => {
  try {
    const album = await Album.findOne({
      albumID: req.params.album_id
    });
    if (!album) return res.status(400).json({ msg: 'Album not found' });
    res.json(album);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Album not found' });
    }
    res.status(500).send('Server error');
  }
});

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

//@route GET api/album/:album_id/photos
//@desc Get an album with it's photos by albumID with pagination
//@access Public

const ITEMS_PER_PAGE = 40;

router.get('/:album_id/photos', async (req, res) => {
  try {
    const album = await Album.findOne({
      albumID: req.params.album_id
    });

    if (!album) return res.status(400).json({ msg: 'Album not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      albumID: req.params.album_id
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const albumPhotos = await Photo.find({
      albumID: req.params.album_id
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      albumPhotos: albumPhotos,
      album: album,
      totalPhotos: totalPhotos,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage: currentPage,
      hasNextPage: hasNextPage,
      nextPage: nextPage,
      hasPreviousPage: hasPreviousPage,
      lastPage: lastPage,
      previousPage: previousPage
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Album not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route DELETE api/album/:album_id
//@desc Delete a album
//@access Private

router.delete('/:album_id', auth, async (req, res) => {
  try {
    const album = await Album.findOne({
      albumID: req.params.album_id
    });
    if (!album) {
      return res.status(404).json({ msg: 'Album not found' });
    }
    await album.remove();

    res.json({ msg: 'Album removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Album not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
