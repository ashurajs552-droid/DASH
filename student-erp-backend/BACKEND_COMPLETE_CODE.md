# Complete Backend Code for Student ERP

## Controllers

### 1. authController.js

```javascript
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Student from '../models/Student.js';
import { generateToken } from '../middleware/auth.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, role, firstName, lastName, studentId } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role,
      studentId: role === 'student' ? studentId : undefined,
      profile: {
        firstName,
        lastName
      }
    });

    // If student, create student record
    if (role === 'student') {
      await Student.create({
        studentId,
        userId: user._id,
        firstName,
        lastName,
        email,
        program: req.body.program || 'Not specified',
        semester: req.body.semester || 1
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profile: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### 2. studentController.js

```javascript
import Student from '../models/Student.js';
import Grade from '../models/Grade.js';
import Attendance from '../models/Attendance.js';
import Fee from '../models/Fee.js';

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'email role');
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', 'email role');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private/Admin
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Admin
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student dashboard data
// @route   GET /api/students/:id/dashboard
// @access  Private
export const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get grades
    const grades = await Grade.find({ studentId: req.params.id });
    
    // Get attendance
    const attendance = await Attendance.find({ studentId: req.params.id });
    
    // Get fees
    const fees = await Fee.find({ studentId: req.params.id });

    // Calculate statistics
    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;

    const totalFees = fees.reduce((acc, fee) => acc + fee.amount, 0);
    const paidFees = fees.reduce((acc, fee) => acc + fee.amountPaid, 0);
    const pendingFees = totalFees - paidFees;

    res.json({
      success: true,
      data: {
        student,
        grades,
        attendance: {
          total: totalClasses,
          present: presentClasses,
          percentage: attendancePercentage
        },
        fees: {
          total: totalFees,
          paid: paidFees,
          pending: pendingFees
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### 3. gradeController.js

```javascript
import Grade from '../models/Grade.js';
import Student from '../models/Student.js';

// @desc    Get all grades
// @route   GET /api/grades
// @access  Private/Admin
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'firstName lastName studentId')
      .populate('enteredBy', 'email');
    
    res.json({
      success: true,
      count: grades.length,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get grades by student ID
// @route   GET /api/grades/student/:studentId
// @access  Private
export const getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId })
      .populate('enteredBy', 'email');
    
    res.json({
      success: true,
      count: grades.length,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new grade
// @route   POST /api/grades
// @access  Private/Admin
export const createGrade = async (req, res) => {
  try {
    const gradeData = {
      ...req.body,
      enteredBy: req.user._id
    };

    const grade = await Grade.create(gradeData);
    
    // Update student CGPA
    const allGrades = await Grade.find({ studentId: req.body.studentId });
    const avgGradePoint = allGrades.reduce((acc, g) => acc + g.gradePoint, 0) / allGrades.length;
    await Student.findByIdAndUpdate(req.body.studentId, { cgpa: avgGradePoint.toFixed(2) });

    res.status(201).json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update grade
// @route   PUT /api/grades/:id
// @access  Private/Admin
export const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Recalculate student CGPA
    const allGrades = await Grade.find({ studentId: grade.studentId });
    const avgGradePoint = allGrades.reduce((acc, g) => acc + g.gradePoint, 0) / allGrades.length;
    await Student.findByIdAndUpdate(grade.studentId, { cgpa: avgGradePoint.toFixed(2) });

    res.json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete grade
// @route   DELETE /api/grades/:id
// @access  Private/Admin
export const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.json({
      success: true,
      message: 'Grade deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

Continue to next section...
