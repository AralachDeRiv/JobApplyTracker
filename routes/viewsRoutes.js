const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middelwares/authMiddelware");

const {
  getProfile,
  getLogin,
  getSignUp,
  getHome,
  getJobDetails,
  getAddJob,
} = require("../controllers/getViews");

router.get("/login", getLogin);
router.get("/signup", getSignUp);
router.get("/profile", requireAuth, getProfile);
router.get("/home", requireAuth, getHome);
router.get("/jobDetails", requireAuth, getJobDetails);
router.get("/addJob", requireAuth, getAddJob);

module.exports = router;
