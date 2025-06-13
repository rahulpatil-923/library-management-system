const bookService = require("../service/bookService");
const path = require("path");

// Render add book form
exports.getAddBook = (req, res) => {
  res.render("addBook", { msg: null });
};

// Handle add book form submission
exports.postAddBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
    } = req.body;
    let image = null;
    if (req.file) {
      image = path.join("uploads", req.file.filename);
    }
    await bookService.addBook({
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
      image,
    });
    res.render("addBook", { msg: "✅ Book added successfully!" });
  } catch (err) {
    let errorMsg =
      "❌ Error: " +
      (err.code === "ER_DUP_ENTRY" ? "ISBN already exists." : err.message);
    res.render("addBook", { msg: errorMsg });
  }
};

// Show all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.render("viewBook", { books });
  } catch (err) {
    res.status(500).send("Error fetching books");
  }
};

// Show update book form
exports.getUpdateBook = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.render("updateBook", { book, msg: null });
  } catch (err) {
    res.status(500).send("Error loading book");
  }
};

// Handle update book form submission
exports.postUpdateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
    } = req.body;
    let image = null;
    if (req.file) {
      image = path.join("uploads", req.file.filename);
    }
    await bookService.updateBook(req.params.id, {
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
      image,
    });
    const book = await bookService.getBookById(req.params.id);
    res.render("updateBook", { book, msg: "✅ Book updated successfully!" });
  } catch (err) {
    const book = await bookService.getBookById(req.params.id);
    res.render("updateBook", { book, msg: "❌ Error updating book" });
  }
};

// Handle delete book
exports.deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.redirect("/books/view");
  } catch (err) {
    res.status(500).send("Error deleting book");
  }
};
