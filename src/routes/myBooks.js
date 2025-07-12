import express from "express";
import { protect } from "../middleware/auth.js";
import MyBook from "../models/myBooks.js";
import Book from "../models/books.js";

const router = express.Router();
router.use(protect);

// GET /api/mybooks
router.get("/", async (req, res) => {
  try {
    const list = await MyBook.find({ userId: req.user._id }).populate("bookId");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/mybooks/:bookId
router.post("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    // Ensure book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const entry = await MyBook.create({ userId: req.user._id, bookId });
    res.status(201).json(entry);
  } catch (err) {
    const code = err.code === 11000 ? 400 : 500; // duplicate key => already added
    res.status(code).json({ message: err.message });
  }
});

// PATCH /api/mybooks/:bookId/status
router.patch("/:bookId/status", async (req, res) => {
  const { status } = req.body;
  try {
    const doc = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId: req.params.bookId },
      { status },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Entry not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/mybooks/:bookId/rating
router.patch("/:bookId/rating", async (req, res) => {
  const { rating } = req.body; // 1‑5
  try {
    const doc = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId: req.params.bookId },
      { rating },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Entry not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
