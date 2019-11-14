const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
process.env.NODE_CONFIG_DIR = './api/config';
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route POST api/users
//@desc Register user
//@access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      user = new User({
        name,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.err(err.message);
      res.status(500).send('Server error');
    }

    // res.send('User route');
  }
);

//@route GET api/users/me
//@desc Get current user profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//@route GET api/users
//@desc Get all users
//@access Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route GET api/user/:user_id
//@desc Get an user by userID
//@access Private

router.get('/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      userID: req.params.user_id
    });
    if (!user) return res.status(400).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route DELETE api/user/:user_id
//@desc Delete a user
//@access Private

router.delete('/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      userID: req.params.user_id
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.remove();

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
