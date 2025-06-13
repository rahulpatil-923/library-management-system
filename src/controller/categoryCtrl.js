const categoryService = require("../service/categoryService");

exports.showAddForm = (req, res) => {
  res.render("addCategories", { msg: null });
};

exports.addCategory = (req, res) => {
  const { name } = req.body;

  categoryService.addCategory(name, (err, result) => {
    if (err) {
      let msg = "Category already exists or error occurred.";
      return res.render("addCategories", { msg });
    }
    res.render("addCategories", { msg: "Category added successfully!" });
  });
};
