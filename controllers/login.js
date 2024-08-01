const User = require("../models/userModel");
const { handleErrors } = require("../services/errorsHandler");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    res.locals.username = user.fullname;
    res.redirect("/home");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = { loginUser };
