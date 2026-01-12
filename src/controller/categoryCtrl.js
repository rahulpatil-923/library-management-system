// src/controller/categoryController.js
const categoryService = require("../service/categoryService");

exports.getAllCategories = async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.trim() : "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    // Get paginated categories and total count
    const { categories, total } = await categoryService.getCategoriesWithSearch(query, page, limit);
    const totalPages = Math.ceil(total / limit) || 1;

    res.render("viewCategories", {
      categories,
      query,
      currentPage: page,
      totalPages,
      error: null
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.render("viewCategories", {
      categories: [],
      query: req.query.q || "",
      currentPage: 1,
      totalPages: 1,
      error: err.message || "Error fetching categories"
    });
  }
};

exports.showAddForm = (req, res) => {
  res.render("addCategory", { error: null, oldName: "" });
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.render("addCategory", { error: "Category name is required.", oldName: name });
    }
    // Only allow letters and spaces (no numbers or symbols)
    const valid = /^[A-Za-z ]+$/;
    if (!valid.test(name.trim())) {
      return res.render("addCategory", { error: "Category name must contain only letters and spaces (no numbers or symbols).", oldName: name });
    }
    // Disallow 'null' (case-insensitive)
    if (name.trim().toLowerCase() === 'null') {
      return res.render("addCategory", { error: "Category name cannot be 'null'.", oldName: name });
    }
    await categoryService.addCategory(name.trim());
    res.redirect("/categories/view");
  } catch (err) {
    console.error("Error adding category:", err);
    res.render("addCategory", { error: "Error adding category: " + err.message, oldName: req.body.name });
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
