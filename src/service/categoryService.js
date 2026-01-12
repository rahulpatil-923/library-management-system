const db = require("../config/db");

// Add category (async/await, no callback)
exports.addCategory = async (name) => {
  await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
};

exports.getCategoriesWithSearch = async (query, page = 1, limit = 5) => {
  const offset = (page - 1) * limit;
  let where = "";
  let params = [];
  if (query) {
    where = "WHERE name LIKE ?";
    params.push(`%${query}%`);
  }
  // Get total count
  const [countRows] = await db.query(
    `SELECT COUNT(*) as cnt FROM categories ${where}`,
    params
  );
  const total = countRows[0].cnt;

  // Get paginated categories
  const [rows] = await db.query(
    `SELECT * FROM categories ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return { categories: rows, total };
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