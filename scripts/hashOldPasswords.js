const db = require("../src/config/db"); // Adjust path if needed
const bcrypt = require("bcrypt");

db.query("SELECT id, password FROM users", async (err, users) => {
  if (err) {
    console.error("Error fetching users:", err);
    return;
  }

  for (const user of users) {
    const { id, password } = user;

    // If already hashed, skip
    if (password.startsWith("$2b$")) continue;

    const hashed = await bcrypt.hash(password, 10);

    db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, id], (err) => {
      if (err) {
        console.error(`❌ Error updating password for ID ${id}:`, err);
      } else {
        console.log(`✅ Updated password for user ID ${id}`);
      }
    });
  }
});
