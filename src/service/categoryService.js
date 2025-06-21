const db = require("../config/db");

// Add category (async/await, no callback)
exports.addCategory = async (name) => {
  await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
};

exports.getCategoriesWithSearch = async (query, page = 1, limit = 5) => {
  const offset = (page - 1) * limit;
  let sql = "SELECT * FROM categories";
  let params = [];
  if (query) {
    sql += " WHERE name LIKE ?";
    params.push(`%${query}%`);
  }
  sql += " LIMIT ? OFFSET ?";
  params.push(limit, offset);
  const [results] = await db.query(sql, params);
  return results;
};

exports.getCategoryById = async (id) => {
  const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0];
};

exports.updateCategory = async (id, name) => {
  await db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
};

exports.deleteCategory = async (id) => {
  await db.query("DELETE FROM categories WHERE id = ?", [id]);
};