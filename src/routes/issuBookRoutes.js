const express = require("express");
const router = express.Router();
const db = require("../config/db"); // adjust this path if needed

router.get("/issued-books/view", async (req, res) => {
  try {
    const [issuedBooks] = await db.query(`
      SELECT 
        i.id,
        b.title AS book_title,
        u.name AS student_name,
        u.email AS student_email,
        i.issue_date,
        i.return_date,
        i.status
      FROM issue_details i
      JOIN books b ON i.book_id = b.id
      JOIN users u ON i.issued_by = u.id
    `);

    res.render("issuedBooks", { issuedBooks }); // Make sure your EJS file is named issuedBooks.ejs
  } catch (err) {
    console.error("Error fetching issued books:", err);
    res.status(500).send("Error loading issued books.");
  }
});

module.exports = router;
