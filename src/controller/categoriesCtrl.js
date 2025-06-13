const categoryService = require("../service/categoryService");

// Show all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.render("viewCategories", { categories });
  } catch (err) {
    res.status(500).send("Error fetching categories");
  }
};

// ...existing code...
