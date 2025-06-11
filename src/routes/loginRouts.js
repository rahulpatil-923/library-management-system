let routes=require("express");
let logiCtrl=require("../controller/loginCtrl.js");

let router=routes.Router();

router.get("/homepage",logiCtrl.loginCtrl);


module.exports=router;