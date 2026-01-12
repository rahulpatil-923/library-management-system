const conn = require('../config/db');
const bcrypt = require("bcrypt");

// Show Add User form
exports.renderAddUser = (req, res) => {
  res.render('addUser');
};

// Handle form submission
exports.handleAddUser = (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error encrypting password');
    }

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    conn.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error adding user');
      }
      res.redirect('/user/view');
    });
  });
};
