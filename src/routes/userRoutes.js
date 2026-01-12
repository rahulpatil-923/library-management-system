const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/UserCtrl");

// Show registration form with paginated users
router.get("/register", userCtrl.getRegisterUser);

// Handle registration form submission
router.post("/register", userCtrl.postRegisterUser);

// Show update user form
router.get("/update/:id", userCtrl.getUpdateUser);

// Handle update user form submission
router.post("/update/:id", userCtrl.postUpdateUser);

// Delete user
router.get("/delete/:id", userCtrl.deleteUser);

module.exports = router;
