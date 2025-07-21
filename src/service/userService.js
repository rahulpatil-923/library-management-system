const db = require("../config/db");
const bcrypt = require('bcryptjs');

exports.getAllStudents = async () => {
  const [rows] = await db.query("SELECT * FROM users WHERE role = 'user'");
  return rows;
};

exports.searchStudents = async (keyword) => {
  const searchTerm = `%${keyword}%`;
  const [rows] = await db.query(
    "SELECT * FROM users WHERE role = 'user' AND (name LIKE ? OR email LIKE ?)",
    [searchTerm, searchTerm]
  );
  return rows;
};

// Fetch user by ID
exports.getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Update user by ID
exports.updateUser = async (id, userData) => {
  const { name, email, role } = userData;
  await db.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id]
  );
};

// Add user
exports.addUser = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );
};

// Delete user by ID
exports.deleteUser = async (userId) => {
  await db.query("DELETE FROM users WHERE id = ?", [userId]);
};

// Check if user has issued books
exports.hasIssuedBooks = async (userId) => {
  const [rows] = await db.query("SELECT COUNT(*) as cnt FROM issue_details WHERE issued_by = ?", [userId]);
  return rows[0].cnt > 0;
};

exports.getPaginatedUsers = async (query, page, perPage) => {
  const offset = (page - 1) * perPage;
  let where = "WHERE role = 'user'";
  let params = [];

  if (query) {
    where += " AND (name LIKE ? OR email LIKE ?)";

    params.push(`%${query}%`, `%${query}%`);
  }

  // Get total count
  const [countRows] = await db.query(
    `SELECT COUNT(*) as cnt FROM users ${where}`,
    params
  );
  const total = countRows[0].cnt;

  // Get paginated users
  const [rows] = await db.query(
    `SELECT * FROM users ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, perPage, offset]
  );
  return { users: rows, total };
};
