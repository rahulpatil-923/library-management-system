const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');

// Render Add User Form
router.get('/addUser', registerController.renderAddUser);

// Handle form submission
router.post('/user/add', registerController.handleAddUser);

module.exports = router;
