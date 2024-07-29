const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {});
const { loginUser } = require("../controllers/login");
router.post("/login", loginUser, (req, res) => {
  res.json("ok");
});

router.get("/signUp", (req, res) => {});
router.post("/signUp", (req, res) => {});

router.get("/user", (req, res) => {});
router.patch("/user/:id", (req, res) => {});

router.get("/job/:id", (req, res) => {});
router.get("/job", (req, res) => {});
router.post("/job", (req, res) => {});
router.patch("/job/:id", (req, res) => {});

router.get("/dashboard", (req, res) => {});

module.exports = router;
