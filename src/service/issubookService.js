
const db = require('../config/db');
// POST /issues/return/:id
router.post("/issues/return/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query("SELECT * FROM issue_details WHERE id = ?", [id]);

    if (!result.length || result[0].status === "returned") {
      return res.status(400).send("Invalid or already returned.");
    }

    await db.query("UPDATE issue_details SET status = 'returned' WHERE id = ?", [id]);
    await db.query("UPDATE books SET available_copies = available_copies + 1 WHERE id = ?", [result[0].book_id]);

    res.redirect("/issues/view");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to return book.");
  }
});
