const {
  upload,
  uploadCVpdf,
  uploadProfilePicture,
} = require("../services/fileService");

const register = async (req, res, next) => {
  try {
    if (req.files["CVpdf"]) {
      const resultCV = await uploadCVpdf(req.files["CVpdf"][0]["buffer"]);
      console.log(resultCV);
    }
    if (req.files["pictureProfile"]) {
      const resultPictureProfile = await uploadProfilePicture(
        req.files["pictureProfile"][0]["buffer"]
      );
      console.log(resultPictureProfile);
    }
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  register,
};
