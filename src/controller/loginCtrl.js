// controller/loginCtrl.js

const loginService = require('../service/loginService');

// Show login page
exports.loginCtrl = (req, res) => {
  res.render("login.ejs"); // Make sure login.ejs exists
};

// Handle login submission
exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  const user = loginService.logLogic(username, password);

  if (user) {
    // If credentials are valid, show success message or redirect
    res.json({
      message: "Login successful!",
      user: {
        username: user.username
      }
    });
  } else {
    // If credentials are invalid
    res.status(401).json({ message: "Invalid username or password" });
  }
};
