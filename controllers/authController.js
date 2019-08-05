const userService = require("../services/userService");
const authService = require("../services/authService");
const { validationResult } = require("express-validator/check");

exports.getAuthorizedUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUser(userId); //User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.signUserToken = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const validPassword = await userService.isValidPassword(password, user);

    if (!validPassword) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    authService.signToken(user, function(err, token) {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
