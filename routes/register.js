const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@access public
//Route api/user/register
router.post('/register', [
  check('email', 'email cannot be empty').isEmail(),
  check('name', 'name cannot be empty').not().isEmpty(),
  check('password', 'password cannot be empty').isLength({ min: 6 }),
  check('phone', 'phone cannot be empty').not().isEmpty(),
  check('age', 'age cannot be empty').not().isEmpty(),
  check('gender', 'gender cannot be empty').not().isEmpty(),
  check('description', 'description cannot be empty').not().isEmpty(),

],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
    {
      console.log(errors)
      return res.status(400).json({ err: errors.array() });
    }
    const { email, name, password, phone, age, gender, description } = req.body;

    try
    {
      let user = await User.find({ email: email });
      if (user.length > 0)
      {
        return res.status(400).json('user already exists');
      }


      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt)

      user = new User({
        email,
        name,
        password: hashPassword,
        phone,
        age,
        gender,
        description
      });

      await user.save();

      const payload = {
        user: {
          id: user._id
        }
      }

      jwt.sign(
        payload,
        config.get('UserKey'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) { throw err }
          else
          {
            return res.status(200).json({
              token,
              user: { email, name, phone, description, gender },
            });
          }
        }
      );
    } catch (err)
    {
      console.log(err);
      return res.status(500).json("server error");
    }
  });

module.exports = router;