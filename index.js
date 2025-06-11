require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const db = require("./src/config/db"); // Import DB connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware and routes here...

app.get("/", (req, res) => {
  res.send("Hello Rahul!");
});

// Start server ONLY after DB connection is established
db.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); // Stop the server if DB connection fails
  } else {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
