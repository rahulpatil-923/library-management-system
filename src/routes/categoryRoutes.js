const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryCtrl");

router.get("/add", categoryController.showAddForm);
router.post("/add", categoryController.addCategory);

module.exports = router;
