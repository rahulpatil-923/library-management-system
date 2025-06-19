require("dotenv").config();
const mysql = require("mysql2/promise");

// ✅ Create a pool for better performance
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "library_db", // replace with your actual DB name
});

// ✅ Optional: test connection (for logs only, not needed for production)
db.getConnection()
  .then(() => console.log("✅ MySQL database connected!"))
  .catch((err) => console.error("❌ MySQL connection failed:", err.message));

module.exports = db;
