import express from 'express';
import {
  getAllFees,
  getFeesByStudent,
  createFee,
  updateFee,
  payFee,
  deleteFee
} from '../controllers/feeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/fees
// @desc    Get all fees
// @access  Private/Admin
router.get('/', protect, admin, getAllFees);

// @route   GET /api/fees/student/:studentId
// @desc    Get fees by student ID
// @access  Private
router.get('/student/:studentId', protect, getFeesByStudent);

// @route   POST /api/fees
// @desc    Create new fee record
// @access  Private/Admin
router.post('/', protect, admin, createFee);

// @route   PUT /api/fees/:id
// @desc    Update fee record
// @access  Private/Admin
router.put('/:id', protect, admin, updateFee);

// @route   POST /api/fees/:id/pay
// @desc    Process fee payment
// @access  Private
router.post('/:id/pay', protect, payFee);

// @route   DELETE /api/fees/:id
// @desc    Delete fee record
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteFee);

export default router;
