const express = require("express");
const router = express.Router();
const viewStudentCtrl = require("../controller/viewStudentCtrl");

// Show all students
router.get("/view", viewStudentCtrl.getAllStudents);

// Show update form
router.get("/update/:id", viewStudentCtrl.getUpdateStudent);
// Handle update
router.post("/update/:id", viewStudentCtrl.postUpdateStudent);

// Handle delete
router.get("/delete/:id", viewStudentCtrl.deleteStudent);

module.exports = router;
