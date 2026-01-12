const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("adminDashboard", {
    title: "Dashboard",
    hideLayout: false
  });
});

module.exports = router;
