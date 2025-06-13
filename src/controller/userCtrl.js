const userService = require("../service/userService");

// Show registration form
exports.getRegisterUser = (req, res) => {
  res.render("regStudent", { msg: null });
};

// Handle registration form submission
exports.postRegisterUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    await userService.addUser({ name, email, password, role });
    res.render("regStudent", { msg: "✅ User registered successfully!" });
  } catch (err) {
    let errorMsg =
      "❌ Error: " +
      (err.code === "ER_DUP_ENTRY" ? "Email already exists." : err.message);
    res.render("regStudent", { msg: errorMsg });
  }
};
