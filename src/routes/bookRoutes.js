const express = require("express");
const router = express.Router();
const bookCtrl = require("../controller/bookCtrl");
const multer = require("multer");
const path = require("path");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Show add book form
router.get("/add", bookCtrl.getAddBook);
// Handle add book form submission
router.post("/add", upload.single("image"), bookCtrl.postAddBook);
// Show all books
router.get("/view", bookCtrl.getAllBooks);
// Show update book form
router.get("/update/:id", bookCtrl.getUpdateBook);
// Handle update book form submission
router.post("/update/:id", upload.single("image"), bookCtrl.postUpdateBook);
// Handle delete book
router.get("/delete/:id", bookCtrl.deleteBook);

module.exports = router;
