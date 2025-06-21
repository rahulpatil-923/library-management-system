const db = require("../config/db");

exports.addBook = async (book) => {
  await db.query(
    `INSERT INTO books (title, author, publisher, isbn, category, total_copies, available_copies, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      book.title,
      book.author,
      book.publisher || null,
      book.isbn || null,
      book.category || null,
      book.total_copies,
      book.available_copies,
      book.status || "available",
      book.image || null,
    ]
  );
};

exports.getAllBooks = async () => {
  const [results] = await db.query("SELECT * FROM books");
  return results;
};

exports.getBookById = async (id) => {
  const [results] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
  return results[0];
};

exports.updateBook = async (id, book) => {
  let sql = `UPDATE books SET title=?, author=?, publisher=?, isbn=?, category=?, total_copies=?, available_copies=?, status=?`;
  let params = [
    book.title,
    book.author,
    book.publisher || null,
    book.isbn || null,
    book.category || null,
    book.total_copies,
    book.available_copies,
    book.status || "available",
  ];
  if (book.image) {
    sql += ", image=?";
    params.push(book.image);
  }
  sql += " WHERE id=?";
  params.push(id);
  await db.query(sql, params);
};

exports.deleteBook = async (id) => {
  await db.query("DELETE FROM books WHERE id = ?", [id]);
};
