const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Photo = require('../../models/Photo');
const Category = require('../../models/Category');
const { check, validationResult } = require('express-validator');

//@route POST api/category
//@desc Add or update category
//@access Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { categoryID, categoryName, categoryDescription } = req.body;

  // Build category object
  const categoryFields = {};
  if (categoryID) categoryFields.categoryID = categoryID;
  if (categoryName) categoryFields.categoryName = categoryName;
  if (categoryDescription)
    categoryFields.categoryDescription = categoryDescription;
  try {
    let category = await Category.findOne({
      categoryID: categoryID
    });
    if (category) {
      //update
      category = await Category.findOneAndUpdate(
        { categoryID: categoryID },
        { $set: categoryFields },
        { new: true }
      );
      return res.json(category);
    }
    // create
    category = new Category(categoryFields);
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/category
//@desc Get all categories
//@access Public

router.get('/', async (req, res) => {
  try {
    const category = await Category.find().sort({ date: +1 });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/category/:category_id
//@desc Get a category by categoryID
//@access Public

router.get('/:category_id', async (req, res) => {
  try {
    // console.log(req);
    const category = await Category.findOne({
      categoryID: req.params.category_id
    });
    if (!category) return res.status(400).json({ msg: 'Category not found' });
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server error');
  }
});

// //@route GET api/category/:category_id/photos
// //@desc Get a category with it's photos by categoryID
// //@access Public

// router.get('/:category_id/photos', async (req, res) => {
//   try {
//     const category = await Category.findOne({
//       categoryID: req.params.category_id
//     });

//     if (!category) return res.status(400).json({ msg: 'Category not found' });

//     const categoryPhotos = await Photo.find({
//       $or: [
//         { categoryID: req.params.category_id },
//         { categoryID2: req.params.category_id },
//         { categoryID3: req.params.category_id }
//       ]
//     });
//     res.json({ categoryPhotos: categoryPhotos, category: category });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(400).json({ msg: 'Category not found' });
//     }
//     res.status(500).send('Server error');
//   }
// });

//@route GET api/category/:category_id/photos
//@desc Get a category with it's photos by categoryID with pagination
//@access Public

const ITEMS_PER_PAGE = 35;
router.get('/:category_id/photos', async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryID: req.params.category_id
    });

    if (!category) return res.status(400).json({ msg: 'Category not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
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

    const categoryPhotos = await Photo.find({
      $or: [
        { categoryID: req.params.category_id },
        { categoryID2: req.params.category_id },
        { categoryID3: req.params.category_id }
      ]
    })
      .sort({ photoID: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.json({
      categoryPhotos: categoryPhotos,
      category: category,
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
      return res.status(400).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route GET api/category/:category_id/photos/:period_id
//@desc Get a category with it's photos by categoryID and by periodID with pagination
//@access Public

router.get('/:category_id/photos-period/:period_id', async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryID: req.params.category_id
    });

    if (!category) return res.status(400).json({ msg: 'Category not found' });

    const page = +req.query.page || 1;

    const currentPage = page;

    const totalPhotos = await Photo.find({
      $or: [
        { categoryID: req.params.category_id },
        { categoryID2: req.params.category_id },
        { categoryID3: req.params.category_id }
      ],
      periodID: req.params.period_id
    }).countDocuments();

    const hasNextPage = ITEMS_PER_PAGE * page < totalPhotos;
    const hasPreviousPage = page > 1;
    const nextPage = page + 1;
    const previousPage = page - 1;
    const lastPage = Math.ceil(totalPhotos / ITEMS_PER_PAGE);

    const categoryPhotos = await Photo.find({
      $or: [
        { categoryID: req.params.category_id },
        { categoryID2: req.params.category_id },
        { categoryID3: req.params.category_id }
      ],
      periodID: req.params.period_id
    })
      .sort({ photoID: -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({
      categoryPhotos: categoryPhotos,
      category: category,
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
      return res.status(400).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route DELETE api/category/:category_id
//@desc Delete a category
//@access Private

router.delete('/:category_id', auth, async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryID: req.params.category_id
    });
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
