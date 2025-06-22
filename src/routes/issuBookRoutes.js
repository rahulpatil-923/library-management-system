// routes/issuBookRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Correct: import the controller
const issueBookController = require("../controller/issubookController");

// ✅ Route to render issue form page
router.get("/issue", issueBookController.renderIssueForm);

// ✅ Route to issue the book (form submission)
router.post("/issue", issueBookController.issueBook);

// ✅ Route to view issued books
router.get("/issued-books/view", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT i.id, i.issue_date, i.return_date, i.status,
             b.title AS book_title,
             u.name AS student_name,
             u.email AS student_email
      FROM issue_details i
      JOIN books b ON i.book_id = b.id
      JOIN users u ON i.issued_by = u.id
      ORDER BY i.issue_date DESC
    `);

    res.render("IssueReturnBook", { issuedBooks: rows });
  } catch (err) {
    console.error("Error fetching issued books:", err);
    res.status(500).send("Error fetching issued books");
  }
});

module.exports = router;
