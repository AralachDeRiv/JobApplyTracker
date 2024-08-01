const User = require("../models/userModel");
const { handleErrors } = require("../services/errorsHandler");

const {
  uploadCVpdf,
  uploadProfilePicture,
} = require("../services/fileService");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    await User.validate(user);

    let CVpdf = "";
    let profilPicture = "";

    if (req.files["CVpdf"]) {
      const resultCV = await uploadCVpdf(req.files["CVpdf"][0]["buffer"]);
      CVpdf = resultCV.secure_url;
    }
    if (req.files["pictureProfile"]) {
      const resultPictureProfile = await uploadProfilePicture(
        req.files["pictureProfile"][0]["buffer"]
      );
      profilPicture = resultPictureProfile.secure_url;
    }

    user.CVpdf = CVpdf;
    user.profilPicture = profilPicture;
    await user.save();

    res.redirect("/home");
  } catch (err) {
    console.log(err.message);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  register,
};
