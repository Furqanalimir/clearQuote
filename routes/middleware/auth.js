const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  try
  {
    if (!token)
    {
      return res.status(203).json('token is missing');
    }
    //verify token
    const decode = jwt.verify(token, config.get('UserKey'));
    req.user = decode.user;
    next();

  } catch (err)
  {
    res.status(401).json({ msg: `token is not valid` })
  }
}