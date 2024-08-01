const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/login");
router.post("/login", loginUser);
const { logoutUser } = require("../controllers/logout");
router.get("/logout", logoutUser);

// Pour post un nouveau user
const { uploadFields } = require("../services/fileService");
const { register } = require("../controllers/signup");
const { handleMulterErrors } = require("../services/errorsHandler");
router.post("/signUp", uploadFields, handleMulterErrors, register);

// Routes pour le profile du user
router.get("/profile/:id", (req, res) => {});
const { updateProfile } = require("../controllers/updateProfile");
router.patch("/profile", uploadFields, handleMulterErrors, updateProfile);

// Retire les files mais et met à jours le porfil
// user.CVpdf devient une chaine de caractères vide
const {
  removePDFfromCloudinary,
  removeProfilePicturefromCloudinary,
} = require("../controllers/updateProfile");
router.delete("/CVpdf", removePDFfromCloudinary);
router.delete("/profilePicture", removeProfilePicturefromCloudinary);

// Routes pour job
const {
  getJob,
  getJobs,
  updateJob,
  addJob,
} = require("../controllers/jobControllers");
router.get("/job/:id", getJob);
router.get("/job", getJobs);
router.post("/job", addJob);
router.patch("/job", updateJob);

module.exports = router;
