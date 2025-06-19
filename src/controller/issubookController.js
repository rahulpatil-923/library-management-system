const db = require('../config/db');

exports.renderIssueForm = async (req, res) => {
  try {
    const [books] = await db.query('SELECT id, title FROM books WHERE available_copies > 0');
    const currentDate = new Date().toISOString().split('T')[0];
    res.render('admin/issueBookRoutes', { books, currentDate });
  } catch (err) {
    console.error('Error loading issue book form:', err);
    res.status(500).send('Internal Server Error');
  }
};
