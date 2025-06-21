const express = require("express");
const router = express.Router();

// ✅ Make sure this path is correct based on your folder structure
const categoryCtrl = require("../controller/categoryCtrl"); // or "../controller/categoryCtrl" if that's the correct file

// ✅ All routes should point to functions from controller
router.get("/add", categoryCtrl.showAddForm);
router.post("/add", categoryCtrl.addCategory);
router.get("/view", categoryCtrl.getAllCategories);
router.get("/edit/:id", categoryCtrl.editCategoryForm);
router.post("/edit/:id", categoryCtrl.updateCategory);
router.get("/delete/:id", categoryCtrl.deleteCategory);

module.exports = router;
