const loginService = require('../service/loginService');

exports.loginCtrl = (req, res) => {
  res.render("login", { msg: null });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  const user = loginService.logLogic(username, password);

  if (user) {
    // Redirect to admin dashboard if login is successful
    res.redirect('/adminDashboard');
  } else {
    // Reload login page with error message
    res.render("login", { msg: "❌ Invalid username or password." });
  }
};
