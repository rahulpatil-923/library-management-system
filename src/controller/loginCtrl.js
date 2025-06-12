let loginService = require('../service/loginService');

exports.loginCtrl = (req, res) => {
  res.render("login", { msg: null });
};

exports.postLogin = (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.render("login", { msg: "Please enter both username and password." });
  }


  let user = loginService.logLogic(username, password);

  if (user) {

    return res.redirect('/adminDashboard');
  } else {
  
    return res.render("login", { msg: "Invalid username or password." });
  }
};
