const express = require('express');

const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Photo = require('../../models/Photo');
const Contributor = require('../../models/Contributor');
const { check, validationResult } = require('express-validator');

//@route POST api/contributor
//@desc Add or update contributor
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { contributorID, name, email, web } = req.body;

  // Build contributor object
  const contributorFields = {};
  if (contributorID) contributorFields.contributorID = contributorID;
  if (name) contributorFields.name = name;
  if (email) contributorFields.email = email;
  if (web) contributorFields.web = web;
  try {
    let contributor = await Contributor.findOne({
      contributorID: contributorID
    });
    if (contributor) {
      //update
      contributor = await Contributor.findOneAndUpdate(
        { contributorID: contributorID },
        { $set: contributorFields },
        { new: true }
      );
      return res.json(contributor);
    }
    // create
    contributor = new Contributor(contributorFields);
    await contributor.save();
    res.json(contributor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// //@route GET api/contributor
// //@desc Get all contributors
// //@access Public

router.get('/', async (req, res) => {
  try {
    const contributor = await Contributor.find().sort({ date: +1 });
    res.json(contributor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// //@route GET api/contributor/:contributor_id
// //@desc Get a contributor by contributorID
// //@access Public

router.get('/:contributor_id', async (req, res) => {
  try {
    // console.log(req);
    const contributor = await Contributor.findOne({
      contributorID: req.params.contributor_id
    });
    if (!contributor)
      return res.status(400).json({ msg: 'Contributor not found' });
    res.json(contributor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Contributor not found' });
    }
    res.status(500).send('Server error');
  }
});

// //@route GET api/contributor/:contributor_id/photos
// //@desc Get an contributor with it's photos by contributorID
// //@access Public

// router.get('/:contributor_id/photos', async (req, res) => {
//   try {
//     const contributor = await Contributor.findOne({
//       contributorID: req.params.contributor_id
//     });

//     if (!contributor)
//       return res.status(400).json({ msg: 'Contributor not found' });

//     const contributorPhotos = await Photo.find({
//       contributorID: req.params.contributor_id
//     });
//     res.json({
//       contributorPhotos: contributorPhotos,
//       contributor: contributor
//     });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ContributorID') {
//       return res.status(400).json({ msg: 'Contributor not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

//@route GET api/contributor/:contributor_id/photos
//@desc Get an contributor with it's photos by contributorID with pagination
//@access Public

const ITEMS_PER_PAGE = 40;

router.get('/:contributor_id/photos', async (req, res) => {
  try {
    const contributor = await Contributor.findOne({
      contributorID: req.params.contributor_id
    });

    if (!contributor)
      return res.status(400).json({ msg: 'Contributor not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      contributorID: req.params.contributor_id
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const contributorPhotos = await Photo.find({
      contributorID: req.params.contributor_id
    })
      .sort({ photoID: +1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      itemsPerPage: ITEMS_PER_PAGE,
      contributorPhotos: contributorPhotos,
      contributor: contributor,
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
    if (err.kind === 'ContributorID') {
      return res.status(400).json({ msg: 'Contributor not found' });
    }
    res.status(500).send('Server error');
  }
});

// //@route DELETE api/contributor/:contributor_id
// //@desc Delete a contributor
// //@access Private

router.delete('/:contributor_id', auth, async (req, res) => {
  try {
    const contributor = await Contributor.findOne({
      contributorID: req.params.contributor_id
    });
    if (!contributor) {
      return res.status(404).json({ msg: 'Contributor not found' });
    }
    await contributor.remove();

    res.json({ msg: 'Contributor removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Contributor not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
