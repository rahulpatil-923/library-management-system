const userService = require("../service/userService");

exports.viewAllStudents = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;

    // Get paginated users and total count from service
    const { users, total } = await userService.getPaginatedUsers(query, page, perPage);

    const totalPages = Math.ceil(total / perPage) || 1;

    res.render("viewStudent", {
      users,
      query,
      currentPage: page,
      totalPages,
      totalUsers: total,
      msg: req.query.msg || null
    });
  } catch (error) {
    console.error("Error loading students:", error);
    res.status(500).send("Server Error");
  }
};
