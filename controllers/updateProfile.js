const { handleErrors } = require("../services/errorsHandler");
const {
  updateProfilePictureFromCloudinary,
  updateCVFromCloudinary,
  removeFileFromCloudinary,
} = require("../services/fileService");
const User = require("../models/userModel");

const updateProfile = async (req, res) => {
  try {
    const id = "66aa005807a11fe4afb965a5";
    const updates = req.body;

    // Si jamais on essaie d'envoyer autre chose qu'un file
    delete updates["CVpdf"], updates["profilPicture"];

    //   console.log(await User.findById(id));

    if (req.files) {
      if (req.files["CVpdf"]) {
        let user = await User.findById(id);
        let previousPdfUrl = user.CVpdf;
        const resultCV = await updateCVFromCloudinary(
          previousPdfUrl,
          req.files["CVpdf"][0]["buffer"]
        );
        const CVpdf = resultCV.secure_url;
        updates.CVpdf = CVpdf;
      }
      if (req.files["pictureProfile"]) {
        let userBis = await User.findById(id);
        let previouspictureProfile = userBis.profilPicture;
        const resultPictureProfile = await updateProfilePictureFromCloudinary(
          previouspictureProfile,
          req.files["pictureProfile"][0]["buffer"]
        );
        const profilPicture = resultPictureProfile.secure_url;
        updates.profilPicture = profilPicture;
      }
    }
    const updateResult = await User.updateOne({ _id: id }, { $set: updates });
    res.json(updateResult);
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

const removePDFfromCloudinary = async (req, res, next) => {
  const id = "66aa005807a11fe4afb965a5";
  try {
    let user = await User.findById(id);
    url = user.CVpdf;
    const result = await removeFileFromCloudinary(url);
    user.CVpdf = "";
    console.log(user);
    user.save();
    res.json(result);
  } catch (err) {
    const errors = handleErrors(err);
    res.json(errors);
  }
};

const removeProfilePicturefromCloudinary = async (req, res, next) => {
  const id = "66aa005807a11fe4afb965a5";
  try {
    let user = await User.findById(id);
    url = user.profilPicture;
    const result = await removeFileFromCloudinary(url);
    user.profilPicture = "";
    console.log(user);
    user.save();
    console.log(user);
    res.json(result);
  } catch (err) {
    const errors = handleErrors(err);
    res.json(errors);
  }
};

module.exports = {
  updateProfile,
  removePDFfromCloudinary,
  removeProfilePicturefromCloudinary,
};
