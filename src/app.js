// app.js: Sets up Express app, middleware, view engine, and routes

const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index.js");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);

module.exports = app;
