const express = require('express');
const config = require('config');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const auth = require('../../middleware/auth');
const sharp = require('sharp');
const User = require('../../models/User');
const Photo = require('../../models/Photo');
const Album = require('../../models/Album');
const Contributor = require('../../models/Contributor');
const Category = require('../../models/Category');
const Location = require('../../models/Location');
const Period = require('../../models/Period');
const { check, validationResult } = require('express-validator');

//@route POST api/photo/upload
//@desc Create photo info
//@access Private

const uploadPath = path.resolve('./', 'public', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body, 'REQ BODY');

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '_open-photobank.jpg'
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Create a photo
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    photoID,
    title,
    description,
    categoryID,
    categoryID2,
    categoryID3,
    locationID,
    contributorID,
    source,
    sourceWeb,
    author,
    albumID,
    albumInfo,
    periodID,
    license
  } = req.body;

  const imgUrl = req.file.path;
  const photoFileName = req.file.filename;
  const imgSize = req.file.size;

  console.log(req.file, 'REQ FILE');

  // Build photo object
  const photoFields = {};

  const albumObject = await Album.findOne({
    albumID: albumID
  });

  const contributorObject = await Contributor.findOne({
    contributorID: contributorID
  });

  const categoryObject = await Category.findOne({
    categoryID: categoryID
  });

  const categoryObject2 = await Category.findOne({
    categoryID: categoryID2
  });

  const categoryObject3 = await Category.findOne({
    categoryID: categoryID3
  });

  const locationObject = await Location.findOne({
    locationID: locationID
  });
  const periodObject = await Period.findOne({
    periodID: periodID
  });

  photoFields.imgUrl = imgUrl;
  photoFields.photoFileName = photoFileName;
  photoFields.imgSize = imgSize;
  if (albumID) photoFields.albumName = albumObject.albumName;
  if (albumID) photoFields.albumInfo = albumObject.albumInfo;
  photoFields.contributorName = contributorObject.name;
  photoFields.contributorWeb = contributorObject.web;
  photoFields.categoryName = categoryObject.categoryName;
  if (categoryID2) photoFields.categoryName2 = categoryObject2.categoryName;
  if (categoryID3) photoFields.categoryName3 = categoryObject3.categoryName;
  photoFields.locationName = locationObject.locationName;
  photoFields.periodName = periodObject.periodName;
  if (photoID) photoFields.photoID = photoID;
  if (title) photoFields.title = title;
  if (description) photoFields.description = description;
  if (categoryID) photoFields.categoryID = categoryID;
  if (categoryID2) photoFields.categoryID2 = categoryID2;
  if (categoryID3) photoFields.categoryID3 = categoryID3;
  if (locationID) photoFields.locationID = locationID;
  if (periodID) photoFields.periodID = periodID;
  if (contributorID) photoFields.contributorID = contributorID;
  if (source) photoFields.source = source;
  if (sourceWeb) photoFields.sourceWeb = sourceWeb;
  if (author) photoFields.author = author;
  if (albumID) photoFields.albumID = albumID;
  if (license) photoFields.license = license;

  try {
    let photo = await Photo.findOne({ photoID: photoID });
    if (photo) {
      //update
      photo = await Photo.findOneAndUpdate(
        { photoID: photoID },
        { $set: photoFields },
        { new: true }
      );
      return res.json(photo);
    }
    // create
    photo = new Photo(photoFields);
    await photo.save();

    //create thumb
    await sharp(req.file.path)
      .resize(200)
      .jpeg({ quality: 80 })
      .toFile(
        path.resolve(
          './',
          'public',
          'uploads',
          'thumbs',
          `${req.file.filename}`
        )
      );

    //create tiles
    await sharp(req.file.path)
      .jpeg({ quality: 80 })
      .tile({
        size: 256
      })
      .toFile(
        path.resolve(
          './',
          'public',
          'uploads',
          'tiles',
          `${req.file.filename}.dz`
        ),
        function(err, info) {
          // output.dzi is the Deep Zoom XML definition
          // output_files contains 512x512 tiles grouped by zoom level
        }
      );

    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/photo
//@desc Create or update photo info (in this case - update)
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    photoID,
    title,
    description,
    categoryID,
    categoryID2,
    categoryID3,
    locationID,
    contributorID,
    source,
    sourceWeb,
    author,
    albumID,
    albumInfo,
    periodID,
    license
  } = req.body;

  // Build photo object
  const photoFields = {};
  //   photoFields.photo = req.photo.id;
  const albumObject = await Album.findOne({
    albumID: albumID
  });

  const contributorObject = await Contributor.findOne({
    contributorID: contributorID
  });

  const categoryObject = await Category.findOne({
    categoryID: categoryID
  });

  const categoryObject2 = await Category.findOne({
    categoryID: categoryID2
  });

  const categoryObject3 = await Category.findOne({
    categoryID: categoryID3
  });

  const locationObject = await Location.findOne({
    locationID: locationID
  });
  const periodObject = await Period.findOne({
    periodID: periodID
  });

  if (albumID) photoFields.albumName = albumObject.albumName;
  if (albumID) photoFields.albumInfo = albumObject.albumInfo;
  photoFields.contributorName = contributorObject.name;
  photoFields.contributorWeb = contributorObject.web;
  photoFields.categoryName = categoryObject.categoryName;
  if (categoryID2) photoFields.categoryName2 = categoryObject2.categoryName;
  if (categoryID3) photoFields.categoryName3 = categoryObject3.categoryName;
  photoFields.locationName = locationObject.locationName;
  photoFields.periodName = periodObject.periodName;
  if (photoID) photoFields.photoID = photoID;
  if (title) photoFields.title = title;
  if (description) photoFields.description = description;
  if (categoryID) photoFields.categoryID = categoryID;
  if (categoryID2) photoFields.categoryID2 = categoryID2;
  if (categoryID3) photoFields.categoryID3 = categoryID3;
  if (locationID) photoFields.locationID = locationID;
  if (periodID) photoFields.periodID = periodID;
  if (contributorID) photoFields.contributorID = contributorID;
  if (source) photoFields.source = source;
  if (sourceWeb) photoFields.sourceWeb = sourceWeb;
  if (author) photoFields.author = author;
  if (albumID) photoFields.albumID = albumID;
  if (license) photoFields.license = license;

  try {
    let photo = await Photo.findOne({ photoID: photoID });
    if (photo) {
      //update
      photo = await Photo.findOneAndUpdate(
        { photoID: photoID },
        { $set: photoFields },
        { new: true }
      );
      return res.json(photo);
    }
    // create
    photo = new Photo(photoFields);
    await photo.save();
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// //@route GET api/photo
// //@desc Get all photos
// //@access Public

// router.get('/', async (req, res) => {
//   try {
//     const photo = await Photo.find().sort({ photoID: +1 });

//     res.json(photo);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

//@route GET api/photo
//@desc Get all photos with pagination for latest component and photo component in dashboard
//@access Public

const ITEMS_PER_PAGE = 40;
router.get('/', async (req, res) => {
  try {
    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find().countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);
    const photos = await Photo.find()
      .sort({ photoID: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.json({
      photos: photos,
      totalPhotos: totalPhotos,
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

//@route GET api/photo/:photo_id
//@desc Get a photo by photoID
//@access Public

router.get('/:photo_id', async (req, res) => {
  try {
    const photo = await Photo.findOne({
      photoID: req.params.photo_id
    });
    if (!photo) return res.status(400).json({ msg: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Photo not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/photo/search
//@desc Search in photos description and title
//@access Public

router.get('/', async (req, res) => {
  try {
    const photo = await Photo.find({ $text: { $search: req.query.q } });
    if (!photo) return res.status(400).json({ msg: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    // if (err.kind === 'ObjectId') {
    //   return res.status(400).json({ msg: 'Photo not found' });
    // }
    res.status(500).send('Server error');
  }
});

//@route DELETE api/photo/:photo_id
//@desc Delete a photo
//@access Private

router.delete('/:photo_id', auth, async (req, res) => {
  try {
    const photo = await Photo.findOne({
      photoID: req.params.photo_id
    });
    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    await photo.remove();

    const imgPath = photo.imgUrl;
    const position = imgPath.indexOf('uploads');
    const splitPosition = position + 8;

    const thumbPath =
      imgPath.substring(0, splitPosition) +
      'thumbs\\' +
      imgPath.substring(splitPosition);

    const tilesPath =
      imgPath.substring(0, splitPosition) +
      'tiles\\' +
      imgPath.substring(splitPosition) +
      '_files';

    const dziPath =
      imgPath.substring(0, splitPosition) +
      'tiles\\' +
      imgPath.substring(splitPosition) +
      '.dzi';

    //remove uploaded photo
    fs.unlink(photo.imgUrl, err => {
      if (err) {
        throw err;
      }
    });

    //remove thumb
    fs.unlink(thumbPath, err => {
      if (err) {
        throw err;
      }
    });

    //remove tiles folder and dzi file
    fs.remove(tilesPath, err => {
      if (err) {
        throw err;
      }
    });

    fs.remove(dziPath, err => {
      if (err) {
        throw err;
      }
    });

    res.json({ msg: 'Photo removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Photo not found' });
    }
    res.status(500).send('Server error');
  }
});

// res.download(`${photo.imgUrl}`);

// request(`${photo.imgUrl}`).pipe(fs.createWriteStream('cat.jpg'));
// request(
//   'http://localhost:3000/uploads/2019-10-30T10-17-52.351ZIMG_2.jpg'
// ).pipe(fs.createWriteStream('photo.jpg'));

// var files = fs.createReadStream(
//   'public/uploads/2019-10-30T10-17-52.351ZIMG_2.jpg'
// );
// res.writeHead(200, {
//   'Content-disposition': 'attachment; filename=photo.jpeg"}'
// });
// files.pipe(res);

// const imgUrl = photo.imgUrl;
// const photoName = imgUrl.splice(15);
// const photoPath = path.join(
//   'public',
//   'uploads',
//   '2019-10-30T10-17-52.351ZIMG_2.jpg'
// );
// const file = fs.createReadStream(photoPath);
// res.setHeader('Content-Type', 'image/jpeg');
// res.setHeader(
//   'Content-Disposition',
//   'attachment; filename="' + 'photoName' + '"'
// );
// file.pipe(res);

// Axios.get(
//   `http://localhost:3000/uploads/2019-10-30T10-17-52.351ZIMG_2.jpg`
// ).then(response => {
//   download(response.data, 'image.jpg');
// });
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
