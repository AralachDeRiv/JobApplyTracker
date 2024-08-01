const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/login");
router.post("/login", loginUser);

// Pour post un nouveau user
const { uploadFields } = require("../services/fileService");
const { register } = require("../controllers/signup");
const { handleMulterErrors } = require("../services/errorsHandler");
router.post("/signUp", uploadFields, handleMulterErrors, register);

// Plus tard pour un potentiel admin
router.get("/users", (req, res) => {});

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
