const db = require("../config/db");

exports.addCategory = (name, callback) => {
  const query = "INSERT INTO categories (name) VALUES (?)";
  db.query(query, [name], callback);
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
