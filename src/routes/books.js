import express from "express";
import Book from "../models/books.js";

const router = express.Router();

// GET /api/books
router.get("/", async (_req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
