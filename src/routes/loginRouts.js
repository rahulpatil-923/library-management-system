const express = require("express");
const router = express.Router();
const loginCtrl = require("../controller/loginCtrl");

// ✅ Homepage route handled by router
router.get("/", (req, res) => {
  res.render("homepage"); // assumes views/homepage.ejs exists
});

// ✅ Login page
router.get("/login", (req, res) => {
  res.render("login", { msg: null });
});

// ✅ Login form handler
router.post("/login", loginCtrl.login);

// ✅ Registration form
router.post("/register", loginCtrl.registerStudent);

module.exports = router;
