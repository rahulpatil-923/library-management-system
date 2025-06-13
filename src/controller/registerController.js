const conn = require('../config/db');

// Show Add Student form
exports.renderAddStudent = (req, res) => {
  res.render('addStudent');
};

// Handle form submission
exports.handleAddStudent = (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  conn.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error registering student');
    }
    res.redirect('/adminDashboard');
  });
};
