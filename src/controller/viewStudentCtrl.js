const userService = require("../service/userService");

exports.viewAllStudents = async (req, res) => {
  try {
    const query = req.query.q;
    let students;

    if (query) {
      students = await userService.searchStudents(query);
    } else {
      students = await userService.getAllStudents();
    }

    res.render("viewStudent", { users: students, query });
  } catch (error) {
    console.error("Error loading students:", error);
    res.status(500).send("Server Error");
  }
};
