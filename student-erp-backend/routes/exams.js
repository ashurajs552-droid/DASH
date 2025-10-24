import express from 'express';
import {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  getUpcomingExams
} from '../controllers/examController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/exams
// @desc    Get all exams
// @access  Private
router.get('/', protect, getAllExams);

// @route   GET /api/exams/upcoming
// @desc    Get upcoming exams
// @access  Private
router.get('/upcoming', protect, getUpcomingExams);

// @route   GET /api/exams/:id
// @desc    Get exam by ID
// @access  Private
router.get('/:id', protect, getExamById);

// @route   POST /api/exams
// @desc    Create new exam
// @access  Private/Admin
router.post('/', protect, admin, createExam);

// @route   PUT /api/exams/:id
// @desc    Update exam
// @access  Private/Admin
router.put('/:id', protect, admin, updateExam);

// @route   DELETE /api/exams/:id
// @desc    Delete exam
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteExam);

export default router;
