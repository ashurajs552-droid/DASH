import express from 'express';
import {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendanceController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/attendance
// @desc    Mark attendance
// @access  Private/Admin
router.post('/', protect, admin, markAttendance);

// @route   GET /api/attendance/student/:studentId
// @desc    Get attendance by student ID
// @access  Private
router.get('/student/:studentId', protect, getAttendanceByStudent);

// @route   GET /api/attendance/date/:date
// @desc    Get attendance by date
// @access  Private/Admin
router.get('/date/:date', protect, admin, getAttendanceByDate);

// @route   PUT /api/attendance/:id
// @desc    Update attendance
// @access  Private/Admin
router.put('/:id', protect, admin, updateAttendance);

// @route   DELETE /api/attendance/:id
// @desc    Delete attendance
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteAttendance);

export default router;
