const express = require("express");
const router = express.Router();
const adminCtrl = require("../controller/adminCtrl");

router.get('/admin-dashboard', (req, res) => {
  res.render('AdminDashboard');
});

module.exports = router;