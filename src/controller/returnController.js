const db = require("../config/db");

exports.returnBook = async (req, res) => {
  const id = req.params.id;
  try {
    // Check if record exists
    const [rows] = await db.query("SELECT * FROM issue_details WHERE id = ?", [id]);
    if (rows.length === 0 || rows[0].status === "returned") {
      return res.status(400).send("Already returned or not found.");
    }

    // Update status
    await db.query("UPDATE issue_details SET status = 'returned' WHERE id = ?", [id]);
    await db.query("UPDATE books SET available_copies = available_copies + 1 WHERE id = ?", [rows[0].book_id]);

    res.redirect("/issues/view");
  } catch (err) {
    console.error("Error returning book:", err);
    res.status(500).send("Server error while returning book.");
  }
};
