import express from 'express';
import Book from '../models/Book.js';  // ✅ Import the Book model
import User from '../models/User.js';  // ✅ Import the User model (needed for issue/return)
import IssuedBook from '../models/IssuedBook.js'; // ✅ Import the new model

const router = express.Router();

// Your existing routes below...
router.post('/add', async (req, res) => {
    try {
      const { title, author } = req.body;
      const book = new Book({ title, author });
      await book.save();
      res.status(201).json({ message: "Book added successfully" });
    } catch (err) {
      console.error("Add book error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post('/issue', async (req, res) => {
    const { bookId, userId } = req.body;
    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 14);
  
    try {
      const book = await Book.findById(bookId);
      if (book.issuedTo) return res.status(400).json({ message: "Book already issued" });
  
      book.issuedTo = userId;
      book.issueDate = issueDate;
      book.returnDate = returnDate;
      await book.save();
  
      await User.findByIdAndUpdate(userId, { $inc: { booksIssued: 1 } });
  
      res.json({ message: "Book issued successfully" });
    } catch (err) {
      console.error("Issue book error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post('/return', async (req, res) => {
    const { bookId } = req.body;
  
    try {
      const book = await Book.findById(bookId);
      if (!book.issuedTo) return res.status(400).json({ message: "Book was not issued" });
  
      // ⬅️ Save issue+return record before wiping book fields
      await IssuedBook.create({
        title: book.title,
        author: book.author,
        userId: book.issuedTo,
        issueDate: book.issueDate,
        returnDate: new Date()
      });
  
      await User.findByIdAndUpdate(book.issuedTo, { $inc: { booksIssued: -1 } });
  
      // ⬅️ Reset book issue data
      book.issuedTo = null;
      book.issueDate = null;
      book.returnDate = null;
      await book.save();
  
      res.json({ message: "Book returned successfully" });
    } catch (err) {
      console.error("Return book error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
//   router.get('/history/:userId', async (req, res) => {
//     try {
//       const books = await IssuedBook.find({ userId: req.params.userId });
//       res.json(books);
//     } catch (err) {
//       console.error("History fetch error:", err.message);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
  router.get('/list', async (req, res) => {
    try {
      const books = await Book.find().populate('issuedTo', 'email role');
      res.json(books);
    } catch (err) {
      console.error("Book fetch error:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  });
  router.delete('/delete/:bookId', async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
      if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
  
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error('Delete book error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  export default router;