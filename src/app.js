const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Routers
const loginRoutes = require("./routes/loginRouts");
const adminRouts = require("./routes/AdminRouts");
const userRoutes = require("./routes/userRoutes");
const viewStudentRoutes = require("./routes/viewStudentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const registerRoutes = require("./routes/registerRoutes");
const issueBookRoutes = require("./routes/issuBookRoutes");
const returnRoutes = require("./routes/returnRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

// Route mounting
app.use("/", loginRoutes);
app.use("/admin", adminRouts);
app.use("/user", userRoutes);
app.use("/user/view", viewStudentRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/register", registerRoutes);
app.use("/issues", issueBookRoutes);      // ✅ Correct: handles /issues/issue etc
app.use("/", returnRoutes);               // For return book and issued-books/view

// Direct view for admin
app.get("/adminDashboard", (req, res) => {
  res.render("adminDashboard");
});

module.exports = app;
