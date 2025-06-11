let express=require("express");
let bodyparser=require("body-parser");
let router=require("../src/routes/loginRouts.js");
let conn=require("../src/config/db.js");
let app=express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use("/",router);
app.set("view engine","ejs");

module.exports=app;