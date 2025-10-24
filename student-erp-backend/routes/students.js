import express from 'express';
import { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent,
  getStudentDashboard
} from '../controllers/studentController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private/Admin
router.get('/', protect, admin, getAllStudents);

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', protect, getStudentById);

// @route   GET /api/students/:id/dashboard
// @desc    Get student dashboard data
// @access  Private
router.get('/:id/dashboard', protect, getStudentDashboard);

// @route   POST /api/students
// @desc    Create new student
// @access  Private/Admin
router.post('/', protect, admin, createStudent);

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private/Admin
router.put('/:id', protect, admin, updateStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteStudent);

export default router;
