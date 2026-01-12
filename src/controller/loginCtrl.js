const db = require("../config/db");

exports.loginPage = (req, res) => {
  res.render("login", { error: null });
};

exports.handleLogin = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const user = results[0];
    // Note: You should hash and compare passwords properly in real apps
    if (user.password === password) {
      // ✅ Login successful → Redirect to Admin Dashboard (with sidebar)
      res.redirect("/admin/dashboard");
    } else {
      res.render("login", { error: "Invalid email or password" });
    }
  });
};
