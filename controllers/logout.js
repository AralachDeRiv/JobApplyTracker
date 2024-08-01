const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};

module.exports = {
  logoutUser,
};
