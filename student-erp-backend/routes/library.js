import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBorrowHistory
} from '../controllers/libraryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/library/books
// @desc    Get all books
// @access  Private
router.get('/books', protect, getAllBooks);

// @route   GET /api/library/books/:id
// @desc    Get book by ID
// @access  Private
router.get('/books/:id', protect, getBookById);

// @route   POST /api/library/books
// @desc    Create new book
// @access  Private/Admin
router.post('/books', protect, admin, createBook);

// @route   PUT /api/library/books/:id
// @desc    Update book
// @access  Private/Admin
router.put('/books/:id', protect, admin, updateBook);

// @route   DELETE /api/library/books/:id
// @desc    Delete book
// @access  Private/Admin
router.delete('/books/:id', protect, admin, deleteBook);

// @route   POST /api/library/borrow
// @desc    Borrow a book
// @access  Private
router.post('/borrow', protect, borrowBook);

// @route   POST /api/library/return/:id
// @desc    Return a book
// @access  Private
router.post('/return/:id', protect, returnBook);

// @route   GET /api/library/history/:studentId
// @desc    Get borrow history for a student
// @access  Private
router.get('/history/:studentId', protect, getBorrowHistory);

export default router;
