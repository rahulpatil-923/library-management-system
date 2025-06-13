const conn = require('../config/db');

// Show registration form
exports.showRegisterForm = (req, res) => {
  res.render('addStudent');
};

// Handle registration
exports.registerStudent = (req, res) => {
  const { name, email, password, role } = req.body;
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  conn.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      return res.status(500).send('Error registering student');
    }
    res.redirect('/adminDashboard');
  });

  
};exports.showRegisterForm = (req, res) => {
  res.render('AdminDashboard', { showAddStudent: true });
};