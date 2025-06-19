
const db = require('../config/db');

exports.updateBookById = async (id, bookData) => {
  const { title, author, publisher, isbn, category, total_copies, available_copies, status } = bookData;

  // check duplicate
  const [duplicate] = await db.query("SELECT * FROM books WHERE (title = ? OR isbn = ?) AND id != ?", [title, isbn, id]);
  if (duplicate.length > 0) throw new Error("Title or ISBN already exists.");

  await db.query(
    `UPDATE books SET title=?, author=?, publisher=?, isbn=?, category=?, total_copies=?, available_copies=?, status=? WHERE id=?`,
    [title, author, publisher, isbn, category, total_copies, available_copies, status, id]
  );
};

exports.getBookById = async (id) => {
  const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return rows[0];
};
