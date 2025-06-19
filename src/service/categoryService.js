const db = require("../config/db");

exports.addCategory = (name, callback) => {
  const query = "INSERT INTO categories (name) VALUES (?)";
  db.query(query, [name], callback);
};

// ✅ Search + Get all
exports.searchCategories = (query) => {
  return new Promise((resolve, reject) => {
    const sql = query
      ? "SELECT * FROM categories WHERE name LIKE ?"
      : "SELECT * FROM categories";
    const params = query ? [`%${query}%`] : [];

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.updateCategory = (id, name) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
