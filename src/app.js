const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Routers
const loginRoutes = require("./routes/loginRouts");
const adminRoutes = require("./routes/AdminRouts");
const userRoutes = require("./routes/userRoutes");
const viewStudentRoutes = require("./routes/viewStudentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const registerRoutes = require("./routes/registerRoutes");
const issueBookRoutes = require("./routes/issuBookRoutes");
const returnRoutes = require('./routes/returnRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/user/view", viewStudentRoutes);

app.use("/categories", categoryRoutes);

app.use("/books", bookRoutes);
app.use("/register", registerRoutes);

app.use("/issueBook",issueBookRoutes)
app.use("/issued-books", issueBookRoutes);
app.use("/returned-books", issueBookRoutes); 


app.use("/",issueBookRoutes)
app.use("/",issueBookRoutes);
app.use("/", returnRoutes);



app.get("/adminDashboard", (req, res) => {
  res.render("adminDashboard");
});

module.exports = app;