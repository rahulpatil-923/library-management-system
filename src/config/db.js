require("dotenv").config();
let mysql2 = require("mysql2");

let conn = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) {
    console.log(" Database connection failed:" + err);
  } else {
    console.log(" Database connected!");
  }
});

module.exports = conn;
