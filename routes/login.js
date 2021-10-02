const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')

//@access public
//Route api/user/login
router.post('/login', [
  check('email', 'email cannot be empty').isEmail(),
  check('password', 'password cannot be empty less than 6 characters').isLength({ min: 6 }),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
      return res.status(400).json({ err: errors.array() });
    }
    const { email, password } = req.body;

    try
    {
      let user = await User.findOne({ email: email });

      if (!user)
      {
        return res.status(400).json('invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
      {
        return res.status(400).send('invalid credentials')
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      const name = user.name

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
              user: { email, name },
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