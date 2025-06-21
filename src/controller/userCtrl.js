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

// Show update user form
exports.getUpdateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.render("updateStudent", { user, msg: null });
  } catch (err) {
    res.status(500).send("Error fetching user details: " + err.message);
  }
};

// Handle update user form submission
exports.postUpdateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  try {
    await userService.updateUser(userId, { name, email, role });
    res.render("updateStudent", { user: { id: userId, name, email, role }, msg: "✅ User updated successfully!" });
  } catch (err) {
    res.render("updateStudent", { user: { id: userId, name, email, role }, msg: "❌ Error updating user: " + err.message });
  }
};
