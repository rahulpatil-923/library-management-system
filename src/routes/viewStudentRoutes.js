const express = require("express");
const router = express.Router();
const viewStudentCtrl = require("../controller/viewStudentCtrl");

// Change route to root so it works with /user/view mount
router.get("/", viewStudentCtrl.viewAllStudents);

module.exports = router;
