let express=require("express");
let app=express();
let bodyparser=require("body-parser");
let router=require("../src/routes/loginRouts.js");
let adminRouter=require("../src/routes/AdminRouts.js");
let conn=require("../src/config/db.js");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set("view engine","ejs");
app.use(express.static('public'));

app.use("/",router);
app.use("/admin", adminRouter);

app.get('/adminDashboard', (req, res) => {
  res.render('adminDashboard'); 
});


module.exports=app;