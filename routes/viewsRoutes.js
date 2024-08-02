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

// Ici le getJob renvoie les data en +
// le id doit se trouver dans les query params
const { getJob } = require("../controllers/jobControllers");

router.get("/login", getLogin);
router.get("/signup", getSignUp);
router.get("/profile", requireAuth, getProfile);
router.get("/home", requireAuth, getHome);
router.get("/jobDetails", requireAuth, getJob);
router.get("/addJob", requireAuth, getAddJob);

module.exports = router;
