import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  examType: {
    type: String,
    enum: ['midterm', 'final', 'quiz', 'practical'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  room: {
    type: String,
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
  totalMarks: {
    type: Number,
    required: true,
    min: 1
  },
  syllabus: [{
    type: String
  }],
  instructions: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
