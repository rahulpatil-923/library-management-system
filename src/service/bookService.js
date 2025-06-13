const db = require("../config/db");

exports.addBook = (book) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO books (title, author, publisher, isbn, category, total_copies, available_copies, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
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
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.updateBook = (id, book) => {
  return new Promise((resolve, reject) => {
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
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
