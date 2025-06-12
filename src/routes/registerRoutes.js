const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');

// Show Add Student form
router.get('/add-student', registerController.showRegisterForm);

// Handle Add Student form submission
router.post('/add-student', registerController.registerStudent);

module.exports = router;