// src/controller/categoryController.js
const categoryService = require("../service/categoryService");

exports.getAllCategories = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const categories = await categoryService.getCategoriesWithSearch(query, page, limit);

    res.render("viewCategories", {
      categories,
      query,
      currentPage: page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page + 1,
      error: null
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.render("viewCategories", {
      categories: [],
      query: req.query.q || "",
      currentPage: 1,
      prevPage: null,
      nextPage: 2,
      error: err.message || "Error fetching categories"
    });
  }
};

exports.showAddForm = (req, res) => {
  res.render("addCategory");
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await categoryService.addCategory(name);
    res.redirect("/categories/view");
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).send("Error adding category");
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.render('editCategory', { category: {}, msg: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.redirect('/categories/view');
  } catch (err) {
    console.error(err);
    res.render('editCategory', { category: req.body, msg: 'Error updating category' });
  }
};
exports.editCategoryForm = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("editCategory", { category, msg: null });
  } catch (err) {
    console.error("Error loading edit category form:", err);
    res.status(500).send("Server Error");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await categoryService.deleteCategory(id);
    res.redirect("/categories/view");
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).send("Server Error");
  }
};
