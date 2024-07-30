const User = require("../models/userModel");
const { handleErrors } = require("../services/errorsHandler");

const {
  uploadCVpdf,
  uploadProfilePicture,
} = require("../services/fileService");

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let CVpdf = "";
    let profilPicture = "";
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });

    if (req.files["CVpdf"]) {
      const resultCV = await uploadCVpdf(req.files["CVpdf"][0]["buffer"]);

      CVpdf = resultCV.secure_url;
      console.log(req.files["CVpdf"][0]["buffer"]);
    }
    if (req.files["pictureProfile"]) {
      const resultPictureProfile = await uploadProfilePicture(
        req.files["pictureProfile"][0]["buffer"]
      );
      profilPicture = resultPictureProfile.secure_url;
    }

    user.profilPicture = profilPicture;
    user.CVpdf = CVpdf;

    user.save();

    next();
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  register,
};
