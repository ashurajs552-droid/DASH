import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  semester: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['midterm', 'final', 'quiz', 'assignment', 'project'],
    default: 'final'
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 1
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  gradePoint: {
    type: Number,
    min: 0,
    max: 10
  },
  remarks: {
    type: String,
    trim: true
  },
  enteredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Calculate percentage before saving
gradeSchema.pre('save', function(next) {
  this.percentage = (this.marksObtained / this.totalMarks) * 100;
  
  // Calculate grade and grade point
  if (this.percentage >= 90) {
    this.grade = 'A+';
    this.gradePoint = 10;
  } else if (this.percentage >= 80) {
    this.grade = 'A';
    this.gradePoint = 9;
  } else if (this.percentage >= 70) {
    this.grade = 'B+';
    this.gradePoint = 8;
  } else if (this.percentage >= 60) {
    this.grade = 'B';
    this.gradePoint = 7;
  } else if (this.percentage >= 50) {
    this.grade = 'C+';
    this.gradePoint = 6;
  } else if (this.percentage >= 40) {
    this.grade = 'C';
    this.gradePoint = 5;
  } else if (this.percentage >= 33) {
    this.grade = 'D';
    this.gradePoint = 4;
  } else {
    this.grade = 'F';
    this.gradePoint = 0;
  }
  
  next();
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
