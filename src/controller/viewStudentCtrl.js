const userService = require("../service/userService");

// Show all students with pagination and search
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = req.query.q ? req.query.q.trim() : "";
    const offset = (page - 1) * limit;
    const { students, total } = await userService.getAllStudentsPaginated({
      query,
      limit,
      offset,
    });
    const totalPages = Math.ceil(total / limit);
    res.render("viewStudent", {
      students,
      page,
      totalPages,
      limit,
      query,
    });
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
};

// Show update form (renders updateStudent.ejs)
exports.getUpdateStudent = async (req, res) => {
  try {
    const student = await userService.getStudentById(req.params.id);
    res.render("updateStudent", { msg: null, student });
  } catch (err) {
    res.status(500).send("Error loading student");
  }
};

// Handle update
exports.postUpdateStudent = async (req, res) => {
  try {
    await userService.updateStudent(req.params.id, req.body);
    // const student = await userService.getStudentById(req.params.id);
    // res.render("viewStudent", {
    //   msg: "✅ Student updated successfully!",
    //   student,
    // });

    res.redirect("/user/view");
  } catch (err) {
    const student = await userService.getStudentById(req.params.id);
    res.render("updateStudent", {
      msg: "❌ Error updating student",
      student,
    });
  }
};

// Handle delete
exports.deleteStudent = async (req, res) => {
  try {
    await userService.deleteStudent(req.params.id);
    res.redirect("/user/view");
  } catch (err) {
    res.status(500).send("Error deleting student");
  }
};
