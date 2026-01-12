exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const [book] = await db.query("SELECT * FROM books WHERE id = ?", [bookId]);
    if (!book) {
      return res.sexports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const [book] = await db.query("SELECT * FROM books WHERE id = ?", [bookId]);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await db.query("DELETE FROM books WHERE id = ?", [bookId]);
    return res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
tatus(404).json({ message: "Book not found" });
    }

    await db.query("DELETE FROM books WHERE id = ?", [bookId]);
    return res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
