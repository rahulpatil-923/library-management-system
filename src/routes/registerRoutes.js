const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');

// Render Add Student Form
router.get('/addStudent', registerController.renderAddStudent);

// Handle form submission
router.post('/student/add', registerController.handleAddStudent);

module.exports = router;
