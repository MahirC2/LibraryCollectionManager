import express from "express";
import { Book } from "../models/Book";

const router = express.Router();
const book = new Book();

router.get("/", async (req, res) => {
  try {
    const books = await book.getAll();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookData = await book.getById(req.params.id);
    if (!bookData) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(bookData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBookId = await book.create(req.body);
    res.status(201).json({ id: newBookId, ...req.body });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await book.update(req.params.id, req.body);
    const updatedBook = await book.getById(req.params.id); 
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await book.delete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default router;
