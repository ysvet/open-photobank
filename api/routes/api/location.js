const express = require('express');

const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const Photo = require('../../models/Photo');
const Location = require('../../models/Location');
const { check, validationResult } = require('express-validator');

//@route POST api/location
//@desc Add or update location
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { locationID, locationName } = req.body;

  // Build contributor object
  const locationFields = {};
  if (locationID) locationFields.locationID = locationID;
  if (locationName) locationFields.locationName = locationName;
  try {
    let location = await Location.findOne({
      locationID: locationID
    });
    if (location) {
      //update
      location = await Location.findOneAndUpdate(
        { locationID: locationID },
        { $set: locationFields },
        { new: true }
      );
      return res.json(location);
    }
    // create
    location = new Location(locationFields);
    await location.save();
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/location
//@desc Get all locations alphabetically
//@access Public

router.get('/', async (req, res) => {
  try {
    const location = await Location.find().sort({ locationName: +1 });
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/location/:location_id
//@desc Get a location by locationID
//@access Public

router.get('/:location_id', async (req, res) => {
  try {
    // console.log(req);
    const location = await Location.findOne({
      locationID: req.params.location_id
    });
    if (!location) return res.status(400).json({ msg: 'Location not found' });
    res.json(location);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/location/:location_name/name
//@desc Get a location by location name
//@access Public

router.get('/:location_name/name', async (req, res) => {
  try {
    // console.log(req);
    const decodedPath = decodeURIComponent(req.params.location_name);
    const location = await Location.findOne({
      locationName: decodedPath
    });
    if (!location) return res.status(400).json({ msg: 'Location not found' });
    res.json(location);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server error');
  }
});

// //@route GET api/location/:location_id/photos
// //@desc Get an location with it's photos by locationID
// //@access Public

// router.get('/:location_id/photos', async (req, res) => {
//   try {
//     const location = await Location.findOne({
//       locationID: req.params.location_id
//     });

//     if (!location) return res.status(400).json({ msg: 'Location not found' });

//     const locationPhotos = await Photo.find({
//       locationID: req.params.location_id
//     });
//     res.json({ locationPhotos: locationPhotos, location: location });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Location not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

//@route GET api/location/:location_id/photos
//@desc Get an location with it's photos by locationID with pagination
//@access Public

const ITEMS_PER_PAGE = 35;

router.get('/:location_id/photos', async (req, res) => {
  try {
    const location = await Location.findOne({
      locationID: req.params.location_id
    });

    if (!location) return res.status(400).json({ msg: 'Location not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      locationID: req.params.location_id
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const locationPhotos = await Photo.find({
      locationID: req.params.location_id
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      locationPhotos: locationPhotos,
      location: location,
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
      return res.status(400).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/location/:location_id/catphotos
//@desc Get an location  by locationID with it's photos anb by category with pagination
//@access Public

router.get('/:location_id/catphotos', async (req, res) => {
  try {
    const location = await Location.findOne({
      locationID: req.params.location_id
    });

    if (!location) return res.status(400).json({ msg: 'Location not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      locationID: req.params.location_id,
      categoryID: req.query.category
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const locationPhotos = await Photo.find({
      locationID: req.params.location_id,
      categoryID: req.query.category
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      locationPhotos: locationPhotos,
      location: location,
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
      return res.status(400).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route DELETE api/location/:location_id
//@desc Delete a location
//@access Private

router.delete('/:location_id', auth, async (req, res) => {
  try {
    const location = await Location.findOne({
      locationID: req.params.location_id
    });
    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }
    await location.remove();

    res.json({ msg: 'Location removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
