const express = require("express");
const router = express.Router();
const adminCtrl = require("../controller/adminCtrl");
const app = require("../app");

// Use router.get, not app.get
router.get('/admin-dashboard', (req, res) => {
  const page = req.query.page || '';
  app.render('adminDashboard', { page });
});

module.exports = router;