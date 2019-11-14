const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Photo = require("../../models/Photo");
const Album = require("../../models/Album");
const Contributor = require("../../models/Contributor");
const Category = require("../../models/Category");
const Location = require("../../models/Location");
const Period = require("../../models/Period");
const { check, validationResult } = require("express-validator");

//@route GET api/search/
//@desc search photo
//@access Public
router.get("/", async (req, res) => {
  try {
    const photo = await Photo.find({
      $text: { $search: req.query.q}
    });
    if (!photo) return res.status(400).json({ msg: "Photo not found" });
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    // if (err.kind === 'ObjectId') {
    //   return res.status(400).json({ msg: 'Photo not found' });
    // }
    res.status(500).send("Server error");
  }
});

module.exports = router;
