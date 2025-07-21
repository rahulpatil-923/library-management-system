const userService = require("../service/userService");

// Show registration form with paginated users
exports.getRegisterUser = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const { users, total } = await userService.getPaginatedUsers(query, page, perPage);
    const totalPages = Math.ceil(total / perPage) || 1;
    res.render("regStudent", {
      msg: null,
      users,
      query,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    res.render("regStudent", {
      msg: "Error loading users.",
      users: [],
      query: "",
      currentPage: 1,
      totalPages: 1
    });
  }
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
    if (!user) {
      // Render with empty user object and error message to avoid undefined error in EJS
      return res.render("updateStudent", { user: { id: '', name: '', email: '', password: '', role: '' }, msg: "User not found." });
    }
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

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const hasIssued = await userService.hasIssuedBooks(userId);
    if (hasIssued) {
      // Show a friendly error message if user has issued books
      return res.render("viewStudent", {
        users: [],
        query: '',
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        msg: "❌ Cannot delete user: User has issued books. Return or delete related records first."
      });
    }
    await userService.deleteUser(userId);
    res.redirect('/user/view');
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err.message);
  }
};
