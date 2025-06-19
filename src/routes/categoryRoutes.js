const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryCtrl");

// Show all categories (with search)
router.get("/view", categoryController.getAllCategories);

// Add
router.get("/add", categoryController.showAddForm);
router.post("/add", categoryController.addCategory);

// ✅ Edit/Update
router.get("/edit/:id", categoryController.editCategoryForm);
router.post("/edit/:id", categoryController.updateCategory);

// ✅ Delete
router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router;
