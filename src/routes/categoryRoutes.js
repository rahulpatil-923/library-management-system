const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryCtrl");

// Show all categories
router.get("/view", categoryController.getAllCategories);
router.get("/add", categoryController.showAddForm);
router.post("/add", categoryController.addCategory);

module.exports = router;
