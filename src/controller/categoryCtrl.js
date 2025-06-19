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

// ✅ View + Search
exports.getAllCategories = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    const categories = await categoryService.searchCategories(query);
    res.render("viewCategories", { categories, query });
  } catch (err) {
    res.status(500).send("Error fetching categories");
  }
};

// ✅ Edit Form
exports.editCategoryForm = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.render("editCategory", { category, msg: null });
  } catch (err) {
    res.status(500).send("Error loading category");
  }
};

// ✅ Handle update
exports.updateCategory = async (req, res) => {
  try {
    await categoryService.updateCategory(req.params.id, req.body.name);
    res.redirect("/categories/view");
  } catch (err) {
    res.status(500).send("Error updating category");
  }
};

// ✅ Handle delete
exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.redirect("/categories/view");
  } catch (err) {
    res.status(500).send("Error deleting category");
  }
};
