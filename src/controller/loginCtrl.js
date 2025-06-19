// ✅ FINAL UPDATED loginCtrl.js using bcrypt
const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).send("Server error");
      }

      if (results.length === 0) {
        return res.render("login", { msg: "❌ User not found" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.render("login", { msg: "❌ Incorrect password" });
      }

      // ✅ Login success
      const message = `✅ Login Successful!`;
      if (user.role === "admin") {
        return res.render("dashboard", { msg: message });
      } else {
        return res.render("dashboard", { msg: message });
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal Server Error");
  }
};


// ✅ REGISTER FUNCTION that stores password in bcrypt form
exports.registerStudent = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if password is already hashed
    const isHashed = password.startsWith("$2b$");
    const finalPassword = isHashed ? password : await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, finalPassword, role],
      (err, result) => {
        if (err) return res.status(500).send("Error saving user");
        res.redirect("/user/view");
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send("Server error");
  }
};
