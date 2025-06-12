// const app = require("./src/app.js");
// const db = require("./src/config/db.js");

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
// index.js: Entry point for LMS application

require("dotenv").config();
const conn = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB, then start the server
conn()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
