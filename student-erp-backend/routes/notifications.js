import express from 'express';
import {
  getAllNotifications,
  getNotificationsByStudent,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead
} from '../controllers/notificationController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get all notifications
// @access  Private
router.get('/', protect, getAllNotifications);

// @route   GET /api/notifications/student/:studentId
// @desc    Get notifications for a student
// @access  Private
router.get('/student/:studentId', protect, getNotificationsByStudent);

// @route   POST /api/notifications
// @desc    Create new notification
// @access  Private/Admin
router.post('/', protect, admin, createNotification);

// @route   PUT /api/notifications/:id
// @desc    Update notification
// @access  Private/Admin
router.put('/:id', protect, admin, updateNotification);

// @route   POST /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
router.post('/:id/read', protect, markAsRead);

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteNotification);

export default router;
