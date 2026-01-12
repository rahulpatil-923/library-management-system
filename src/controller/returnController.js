const db = require("../config/db");



router.get("/issued-books/view", returnController.viewIssuedBooks);


router.post("/issued-books/returned", returnController.returnBook);


exports.returnBook = async (req, res) => {
  const { issue_id } = req.body;

  try {
    // Check if issued book exists and is not already returned
    const [rows] = await db.promise().query("SELECT * FROM issue_details WHERE id = ?", [issue_id]);

    if (rows.length === 0) {
      return res.status(404).send("Issue record not found.");
    }

    const issue = rows[0];

    if (issue.status === "returned") {
      return res.status(400).send("This book is already returned.");
    }

    // Update issue_details table
    await db.promise().query("UPDATE issue_details SET status = 'returned' WHERE id = ?", [issue_id]);

    // Update available_copies in books table
    await db.promise().query("UPDATE books SET available_copies = available_copies + 1 WHERE id = ?", [issue.book_id]);

    // Redirect to issued-books page
    res.redirect("/issued-books/view");

  } catch (err) {
    console.error("Error returning book:", err);
    res.status(500).send("Server error while returning book.");
  }
};
