const express = require("express");
const router = express.Router();

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
router.get("/profile", getProfile);
router.get("/home", getHome);
router.get("/jobDetails", getJobDetails);
router.get("/addJob", getAddJob);

module.exports = router;
