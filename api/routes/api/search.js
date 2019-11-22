const express = require('express');
// const config = require("config");
const router = express.Router();

const Photo = require('../../models/Photo');

// const { check, validationResult } = require("express-validator");

//@route GET api/search/
//@desc search photo
//@access Public
router.get('/', async (req, res) => {
  try {
    const photo = await Photo.find({
      $text: { $search: req.query.q }
    });
    if (!photo) return res.status(400).json({ msg: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
