const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('./middleware/auth')

//@access public
//@Route GET api/getall
router.get('/getall',
  async (req, res) => {

    try
    {
      const user = await User.find({}).select('email name gender description phone').sort();

      return res.status(200).json(user)

    } catch (err)
    {
      console.log(err);
      return res.status(500).json("server error");
    }
  });


//@access private
//@Route  PUT api/user/updateuser
router.put('/updateuser', auth,
  async (req, res) => {

    try
    {

      let user = await User.findOne({ _id: req.user.id })

      if (req.body.name)
      {
        user.name = req.body.name;
      }

      if (req.body.email)
      {

        user.email = req.body.email;
      }

      if (req.body.password) { user.password = req.body.password; }

      await user.save();
      return res.status(200).json({ msg: 'user updated', user })

    } catch (err)
    {
      console.log(err);
      return res.status(500).json("server error");
    }
  });

//@access protected
//@Route  Delete api/user/delete
router.delete('/delete', auth, async (req, res) => {
  try
  {
    const user = await User.findOne({ _id: req.user.id });
    if (!user)
    {
      return res.status(404).json('user not found check your credentials');
    }

    await User.findOneAndRemove({ _id: req.user.id });
    return res.status(200).json('user deleted successfully');
  } catch (err)
  {
    return res.status(500).json('server error');
  }
})


module.exports = router;