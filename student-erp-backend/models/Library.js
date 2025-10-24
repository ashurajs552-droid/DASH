import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'Engineering', 'Literature', 'Other'],
    required: true
  },
  publisher: {
    type: String,
    trim: true
  },
  publicationYear: {
    type: Number
  },
  totalCopies: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['available', 'out-of-stock', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

const borrowRecordSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  borrowDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue', 'lost'],
    default: 'borrowed'
  },
  fine: {
    type: Number,
    default: 0,
    min: 0
  },
  remarks: {
    type: String,
    trim: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Update book status based on available copies
bookSchema.pre('save', function(next) {
  if (this.availableCopies === 0) {
    this.status = 'out-of-stock';
  } else if (this.status === 'out-of-stock' && this.availableCopies > 0) {
    this.status = 'available';
  }
  next();
});

// Calculate fine for overdue books
borrowRecordSchema.pre('save', function(next) {
  if (this.status === 'borrowed') {
    const today = new Date();
    if (this.dueDate < today) {
      this.status = 'overdue';
      const daysOverdue = Math.ceil((today - this.dueDate) / (1000 * 60 * 60 * 24));
      this.fine = daysOverdue * 5; // $5 per day
    }
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);
const BorrowRecord = mongoose.model('BorrowRecord', borrowRecordSchema);

export { Book, BorrowRecord };
