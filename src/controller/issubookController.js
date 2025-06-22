// For GET form page
exports.renderIssueForm = async (req, res) => {
  try {
    const [books] = await db.query('SELECT id, title FROM books WHERE available_copies > 0');
    const [users] = await db.query('SELECT id, name FROM users WHERE role = "student"'); // add if needed
    const currentDate = new Date().toISOString().split('T')[0];
    res.render('IssueBook', { books, users, currentDate }); // match EJS file
  } catch (err) {
    console.error('Error loading issue book form:', err);
    res.status(500).send('Internal Server Error');
  }
};

// For POST (issuing a book)
exports.issueBook = async (req, res) => {
  const { book_id, issued_by, issue_date, return_date } = req.body;
  try {
    await db.query(
      "INSERT INTO issue_details (book_id, issued_by, issue_date, return_date, status) VALUES (?, ?, ?, ?, 'issued')",
      [book_id, issued_by, issue_date, return_date]
    );
    await db.query("UPDATE books SET available_copies = available_copies - 1 WHERE id = ?", [book_id]);
    res.redirect("/issues/view");
  } catch (err) {
    console.error("Error issuing book:", err);
    res.status(500).send("Failed to issue book.");
  }
};

