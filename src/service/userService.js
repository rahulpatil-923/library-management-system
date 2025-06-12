const db = require("../config/db");

exports.addUser = ({ name, email, password, role }) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, password, role], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE role ", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getAllStudentsPaginated = ({ query, limit, offset }) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT SQL_CALC_FOUND_ROWS * FROM users WHERE role";
    let params = [];
    if (query) {
      sql +=
        " AND (name LIKE ? OR email LIKE ? OR password LIKE ? OR role LIKE ?)";
      const likeQuery = `%${query}%`;
      params.push(likeQuery, likeQuery, likeQuery, likeQuery);
    }
    sql += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      db.query("SELECT FOUND_ROWS() as total", (err2, totalRows) => {
        if (err2) return reject(err2);
        resolve({ students: results, total: totalRows[0].total });
      });
    });
  });
};

exports.getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.updateStudent = (id, data) => {
  return new Promise((resolve, reject) => {
    const { name, email, password, role } = data;
    db.query(
      "UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?",
      [name, email, password, role, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

exports.deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
