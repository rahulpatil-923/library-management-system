const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/UserCtrl");

// Show registration form
router.get("/register", userCtrl.getRegisterUser);

// Handle registration form submission
router.post("/register", userCtrl.postRegisterUser);

module.exports = router;
