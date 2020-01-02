const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function(req, res, next) {
  //get header token
  const token = req.header("x-auth-token");

  //if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    await jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
      if(error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Something went wrong with the auth middleware');
    res.status(500).json({ msg: 'Server Error' })
  }
};
