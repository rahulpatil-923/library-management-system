const express = require("express");
const router = express.Router();
const loginService = require("../service/loginService");

// GET login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// POST login logic
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const isValidUser = loginService.logLogic(email, password);

  if (isValidUser) {
    return res.redirect("/adminDashboard");
  } else {
    console.log(JSON.stringify({ message: "Invalid email or password" }));
    return res.render("login", { error: "Username or password is incorrect" });
  }
});

module.exports = router;
