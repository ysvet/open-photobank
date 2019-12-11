const express = require('express');

const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const Period = require('../../models/Period');
const Photo = require('../../models/Photo');
const Location = require('../../models/Location');
const { check, validationResult } = require('express-validator');

//@route POST api/period
//@desc Add or update period
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { periodID, periodName } = req.body;

  // Build period object
  const periodFields = {};
  if (periodID) periodFields.periodID = periodID;
  if (periodName) periodFields.periodName = periodName;
  try {
    let period = await Period.findOne({
      periodID: periodID
    });
    if (period) {
      //update
      period = await Period.findOneAndUpdate(
        { periodID: periodID },
        { $set: periodFields },
        { new: true }
      );
      return res.json(period);
    }
    // create
    period = new Period(periodFields);
    await period.save();
    res.json(period);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/period
//@desc Get all periods
//@access Public

router.get('/', async (req, res) => {
  try {
    const period = await Period.find().sort({ periodName: +1 });
    res.json(period);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/period/:period_id
//@desc Get a period by periodID
//@access Public

router.get('/:period_id', async (req, res) => {
  try {
    const period = await Period.findOne({
      periodID: req.params.period_id
    });
    if (!period) return res.status(400).json({ msg: 'Period not found' });
    res.json(period);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Period not found' });
    }
    res.status(500).send('Server error');
  }
});

// //@route GET api/period/:period_id/photos
// //@desc Get a period with it's photos by periodID
// //@access Public

// router.get('/:period_id/photos', async (req, res) => {
//   try {
//     const period = await Period.findOne({
//       periodID: req.params.period_id
//     });

//     if (!period) return res.status(400).json({ msg: 'Period not found' });

//     const periodPhotos = await Photo.find({
//       periodID: req.params.period_id
//     });
//     res.json({ periodPhotos: periodPhotos, period: period });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Period not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

//@route GET api/period/:period_id/photos
//@desc Get a period with it's photos by periodID with pagination
//@access Public

const ITEMS_PER_PAGE = 35;

router.get('/:period_id/photos', async (req, res) => {
  try {
    const period = await Period.findOne({
      periodID: req.params.period_id
    });

    if (!period) return res.status(400).json({ msg: 'Period not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      periodID: req.params.period_id
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const periodPhotos = await Photo.find({
      periodID: req.params.period_id
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      periodPhotos: periodPhotos,
      period: period,
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
      return res.status(400).json({ msg: 'Period not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/period/:period_id/photos-category/:category_id
//@desc Get an period with it's photos by periodID and by categoryID with pagination
//@access Public

router.get('/:period_id/photos/:category_id', async (req, res) => {
  try {
    const period = await Period.findOne({
      periodID: req.params.period_id
    });

    if (!period) return res.status(400).json({ msg: 'Period not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      periodID: req.params.period_id,
      $or: [
        { categoryID: req.params.category_id },
        { categoryID2: req.params.category_id },
        { categoryID3: req.params.category_id }
      ]
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const periodPhotos = await Photo.find({
      periodID: req.params.period_id,
      $or: [
        { categoryID: req.params.category_id },
        { categoryID2: req.params.category_id },
        { categoryID3: req.params.category_id }
      ]
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      periodPhotos: periodPhotos,
      period: period,
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

//@route DELETE api/period/:period_id
//@desc Delete a period
//@access Private

router.delete('/:period_id', auth, async (req, res) => {
  try {
    const period = await Period.findOne({
      periodID: req.params.period_id
    });
    if (!period) {
      return res.status(404).json({ msg: 'Period not found' });
    }
    await period.remove();

    res.json({ msg: 'Period removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Period not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
