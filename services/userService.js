const User = require("../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

exports.getUser = async userId => {
  return await User.findById(userId).select("-password");
};

exports.getUserByEmail = async email => {
  return await User.findOne({ email });
};

exports.isValidPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

exports.postUser = async (name, email, password, avatar) => {
  user = new User({
    name,
    email,
    avatar,
    password
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  return await user.save();
};

exports.getUserAvatar = async email => {
  return await gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
};

exports.deleteUser = async userId => {
  return await User.findOneAndRemove(userId);
};
