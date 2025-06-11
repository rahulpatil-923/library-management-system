const express = require("express");
const router = express.Router();
const adminCtrl = require("../controller/adminCtrl");

router.get("/dashboard", adminCtrl.dashboardCtrl);

module.exports = router;
