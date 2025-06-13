const db = require("../config/db");

exports.addCategory = (name, callback) => {
  const query = "INSERT INTO categories (name) VALUES (?)";
  db.query(query, [name], callback);
};
