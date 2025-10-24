import express from 'express';
import {
  getAllGrades,
  getGradesByStudent,
  createGrade,
  updateGrade,
  deleteGrade
} from '../controllers/gradeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/grades
// @desc    Get all grades
// @access  Private/Admin
router.get('/', protect, admin, getAllGrades);

// @route   GET /api/grades/student/:studentId
// @desc    Get grades by student ID
// @access  Private
router.get('/student/:studentId', protect, getGradesByStudent);

// @route   POST /api/grades
// @desc    Create new grade
// @access  Private/Admin
router.post('/', protect, admin, createGrade);

// @route   PUT /api/grades/:id
// @desc    Update grade
// @access  Private/Admin
router.put('/:id', protect, admin, updateGrade);

// @route   DELETE /api/grades/:id
// @desc    Delete grade
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteGrade);

export default router;
