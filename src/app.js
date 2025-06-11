let express=require("express");
let bodyparser=require("body-parser");
let router=require("../src/routes/loginRouts.js");
let conn=require("../src/config/db.js");
let app=express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.set("view engine","ejs");
app.use(express.static('public'));

app.use("/",router);

app.get('/login', (req, res) => {
  res.render('login');
});



module.exports=app;