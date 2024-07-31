const User = require("../models/userModel");
const { handleErrors } = require("../services/errorsHandler");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    res.locals.username = user.fullname;
    res.json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = { loginUser };
