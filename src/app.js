let express = require("express");
let app = express();
let bodyparser = require("body-parser");

let router = require("../src/routes/loginRouts.js");
let registerRouter = require("./routes/registerRoutes");
let adminRouter = require("../src/routes/AdminRouts.js");
// Remove this line if you don't have a separate studentRoutes file
// let studentRoutes = require("./routes/registerRoutes");

let conn = require("../src/config/db.js");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/", router);
app.use("/", require("./routes/loginRouts"));
app.use("/admin", adminRouter);
app.use("/register", registerRouter);
// Remove this line if you don't have a separate studentRoutes file
// app.use("/", studentRoutes);

app.get("/adminDashboard", (req, res) => {
  res.render("adminDashboard");
});

module.exports = app;