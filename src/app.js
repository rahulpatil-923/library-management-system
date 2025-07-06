const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// ✅ View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Make sure views/ exists at root level

// ✅ Static & Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Routers
const loginRoutes = require("./routes/loginRouts");
const adminRouts = require("./routes/AdminRouts");
const userRoutes = require("./routes/userRoutes");
const viewStudentRoutes = require("./routes/viewStudentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const registerRoutes = require("./routes/registerRoutes");
const issueBookRoutes = require("./routes/issuBookRoutes");
const returnRoutes = require("./routes/returnRoutes");


app.use("/", loginRoutes);
app.use("/user", userRoutes);
app.use("/user/view", viewStudentRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/register", registerRoutes);

app.use("/", issueBookRoutes);

app.use("/", returnRoutes);


app.get("/", (req, res) => {
  res.render("homepage"); 
});


app.get("/adminDashboard", (req, res) => {
  res.render("adminDashboard");
});

module.exports = app;
