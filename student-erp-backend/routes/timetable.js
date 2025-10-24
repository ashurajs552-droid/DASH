import express from 'express';
import {
  getAllTimetables,
  getTimetableBySemester,
  createTimetable,
  updateTimetable,
  deleteTimetable
} from '../controllers/timetableController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/timetable
// @desc    Get all timetables
// @access  Private/Admin
router.get('/', protect, admin, getAllTimetables);

// @route   GET /api/timetable/semester/:semester/section/:section
// @desc    Get timetable by semester and section
// @access  Private
router.get('/semester/:semester/section/:section', protect, getTimetableBySemester);

// @route   POST /api/timetable
// @desc    Create new timetable entry
// @access  Private/Admin
router.post('/', protect, admin, createTimetable);

// @route   PUT /api/timetable/:id
// @desc    Update timetable entry
// @access  Private/Admin
router.put('/:id', protect, admin, updateTimetable);

// @route   DELETE /api/timetable/:id
// @desc    Delete timetable entry
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteTimetable);

export default router;
