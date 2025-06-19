const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/add", async (req, res) => {
  try {
    const [books] = await db.query("SELECT id, title FROM books WHERE available_copies > 0");
    const currentDate = new Date().toISOString().split("T")[0];
    res.render("issueBookRoutes", {
      books,
      currentDate,
      title: "Issue Book"
    });
  } catch (err) {
    console.error("Error loading form:", err);
    res.status(500).send("Error loading issue form");
  }
});

module.exports = router;
