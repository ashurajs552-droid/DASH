import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  feeType: {
    type: String,
    enum: ['tuition', 'lab', 'library', 'sports', 'examination', 'hostel', 'transport', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'partial'],
    default: 'pending'
  },
  amountPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'netbanking', 'upi', 'cheque'],
  },
  transactionId: {
    type: String,
    trim: true
  },
  receipt: {
    receiptNumber: String,
    generatedDate: Date
  },
  remarks: {
    type: String,
    trim: true
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Update status based on payment
feeSchema.pre('save', function(next) {
  const today = new Date();
  
  if (this.amountPaid >= this.amount) {
    this.status = 'paid';
  } else if (this.amountPaid > 0 && this.amountPaid < this.amount) {
    this.status = 'partial';
  } else if (this.dueDate < today && this.status === 'pending') {
    this.status = 'overdue';
  }
  
  next();
});

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;
