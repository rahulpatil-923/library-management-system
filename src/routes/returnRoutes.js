// returnRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");





// Returned Books View Route
router.get("/returned-books/view", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT i.id, i.issue_date, i.return_date, i.status,
             b.title AS book_title,
             u.name AS student_name,
             u.email AS student_email
      FROM issue_details i
      JOIN books b ON i.book_id = b.id
      JOIN users u ON i.issued_by = u.id
      WHERE i.status = 'returned'
      ORDER BY i.return_date DESC
    `);

    res.render("IssueReturnBook", { issuedBooks: rows }); // 👈 Your view file name
  } catch (err) {
    console.error("Error loading returned books:", err);
    res.status(500).send("Error loading returned books");
  }
});

module.exports = router;
