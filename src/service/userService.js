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
