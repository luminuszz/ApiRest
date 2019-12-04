const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next)=>{
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(404).json({error: 'Token nor provided'});
  }

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, authConfig.secret);
  } catch (err) {

  }
};
