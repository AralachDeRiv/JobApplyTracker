const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {});
const { loginUser } = require("../controllers/login");
router.post("/login", loginUser, (req, res) => {
  res.json("ok");
});

const { uploadFields } = require("../services/fileService");
const { register } = require("../controllers/signup");
router.get("/signUp", (req, res) => {});
router.post("/signUp", uploadFields, register, (req, res) => {
  res.send("ok");
});

router.get("/user", (req, res) => {});
router.patch("/user/:id", (req, res) => {});

const { addJob } = require("../controllers/jobControllers");
router.get("/job/:id", (req, res) => {});
router.post("/job", addJob, (req, res) => {
  res.send("ok");
});
const { getJobs } = require("../controllers/jobControllers");
router.get("/job", getJobs, (req, res) => {});
router.patch("/job/:id", (req, res) => {});

router.get("/dashboard", (req, res) => {});

module.exports = router;
