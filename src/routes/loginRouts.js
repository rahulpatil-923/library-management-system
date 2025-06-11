let routes=require("express");
let navbarCtrl=require("../controller/navbarCtrl.js");
let loginCtrl=require("../controller/loginCtrl.js");


let router=routes.Router();

router.get("/",navbarCtrl.navbarCtrl);


router.get("/login",loginCtrl.loginCtrl);
router.post('/login', loginCtrl.postLogin);



module.exports=router;