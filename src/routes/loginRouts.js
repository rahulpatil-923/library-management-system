let express = require("express");
let loginCtrl = require("../controller/loginCtrl.js");
let router = express.Router();


router.get("/", (req, res) => {
  res.render("homepage");
});


router.get("/login", loginCtrl.loginCtrl);
router.post("/login", loginCtrl.postLogin);

module.exports = router;