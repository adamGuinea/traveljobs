const jwt = require("jsonwebtoken");
const config = require("config");

exports.signToken = (user, callback) => {
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) callback(err);
      callback(null, token);
    }
  );
};
