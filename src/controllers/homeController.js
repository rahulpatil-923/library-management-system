const session = require("express-session");

exports.home = (req, res) => {
  res.render("home", { title: "Home" });
};
