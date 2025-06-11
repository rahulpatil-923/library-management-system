require("dotenv").config();
let mysql = require("mysql2");

let conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connection established");
  }
});
module.exports = conn;
