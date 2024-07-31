const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {});
const { loginUser } = require("../controllers/login");
router.post("/login", loginUser);

const { uploadFields } = require("../services/fileService");
const { register } = require("../controllers/signup");
const { handleMulterErrors } = require("../services/errorsHandler");
router.get("/signUp", (req, res) => {});
router.post("/signUp", uploadFields, handleMulterErrors, register);

router.get("/user", (req, res) => {});

router.get("/profile/:id", (req, res) => {});
const { updateProfile } = require("../controllers/updateProfile");
router.patch("/profile", uploadFields, handleMulterErrors, updateProfile);

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

router.get("/dashboard", (req, res) => {});

module.exports = router;
