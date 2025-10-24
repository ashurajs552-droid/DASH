# Student ERP Backend API

Complete Node.js/Express backend with MongoDB for Student ERP Dashboard.

## 🚀 Features

- ✅ RESTful API Architecture
- ✅ JWT Authentication & Authorization
- ✅ Role-based Access Control (Admin/Student)
- ✅ MongoDB Database with Mongoose ODM
- ✅ Complete CRUD Operations for all entities
- ✅ Input Validation
- ✅ Error Handling
- ✅ CORS Enabled
- ✅ Environment Configuration

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **CORS:** cors
- **Environment:** dotenv
- **Logger:** morgan

## 📁 Project Structure

```
student-erp-backend/
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── studentController.js
│   ├── gradeController.js
│   ├── attendanceController.js
│   ├── feeController.js
│   ├── examController.js
│   ├── libraryController.js
│   ├── notificationController.js
│   └── timetableController.js
├── models/               # Database models
│   ├── User.js
│   ├── Student.js
│   ├── Grade.js
│   ├── Attendance.js
│   ├── Fee.js
│   ├── Exam.js
│   ├── Library.js
│   ├── Notification.js
│   └── Timetable.js
├── routes/               # API routes
│   ├── auth.js
│   ├── students.js
│   ├── grades.js
│   ├── attendance.js
│   ├── fees.js
│   ├── exams.js
│   ├── library.js
│   ├── notifications.js
│   └── timetable.js
├── middleware/           # Custom middleware
│   └── auth.js
├── scripts/              # Utility scripts
│   └── seedDatabase.js
├── .env.example          # Environment variables template
├── server.js             # Entry point
├── package.json          # Dependencies
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Step 1: Clone or Navigate to Backend Directory

```bash
cd student-erp-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-erp
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5174
```

### Step 4: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Step 5: Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "studentId": "STU001",
  "program": "Computer Science",
  "semester": 1
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Students

#### Get All Students (Admin Only)
```http
GET /api/students
Authorization: Bearer <admin_token>
```

#### Get Student by ID
```http
GET /api/students/:id
Authorization: Bearer <token>
```

#### Create Student (Admin Only)
```http
POST /api/students
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "STU002",
  "userId": "user_object_id",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "program": "Engineering",
  "semester": 2
}
```

#### Update Student (Admin Only)
```http
PUT /api/students/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "semester": 3,
  "cgpa": 8.5
}
```

#### Delete Student (Admin Only)
```http
DELETE /api/students/:id
Authorization: Bearer <admin_token>
```

#### Get Student Dashboard
```http
GET /api/students/:id/dashboard
Authorization: Bearer <token>
```

### Grades

#### Create Grade (Admin Only)
```http
POST /api/grades
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "student_object_id",
  "subject": "Mathematics",
  "semester": 1,
  "academicYear": "2024-25",
  "examType": "final",
  "marksObtained": 85,
  "totalMarks": 100
}
```

#### Get Grades by Student
```http
GET /api/grades/student/:studentId
Authorization: Bearer <token>
```

### Attendance

#### Mark Attendance (Admin Only)
```http
POST /api/attendance
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "student_object_id",
  "subject": "Physics",
  "date": "2024-10-24",
  "status": "present",
  "semester": 1,
  "academicYear": "2024-25"
}
```

#### Get Attendance by Student
```http
GET /api/attendance/student/:studentId
Authorization: Bearer <token>
```

### Fees

#### Create Fee Record (Admin Only)
```http
POST /api/fees
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "studentId": "student_object_id",
  "semester": "Fall 2024",
  "academicYear": "2024-25",
  "feeType": "tuition",
  "amount": 5000,
  "dueDate": "2024-12-31"
}
```

#### Pay Fee
```http
POST /api/fees/:id/pay
Authorization: Bearer <token>
Content-Type: application/json

{
  "amountPaid": 5000,
  "paymentMethod": "card",
  "transactionId": "TXN123456"
}
```

#### Get Fees by Student
```http
GET /api/fees/student/:studentId
Authorization: Bearer <token>
```

### Exams

#### Create Exam (Admin Only)
```http
POST /api/exams
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "subject": "Chemistry",
  "examType": "final",
  "date": "2024-12-15",
  "startTime": "09:00 AM",
  "endTime": "12:00 PM",
  "duration": 180,
  "room": "Exam Hall A",
  "semester": 1,
  "academicYear": "2024-25",
  "totalMarks": 100,
  "syllabus": ["Chapter 1", "Chapter 2"]
}
```

#### Get All Exams
```http
GET /api/exams
Authorization: Bearer <token>
```

#### Get Upcoming Exams
```http
GET /api/exams/upcoming
Authorization: Bearer <token>
```

### Library

#### Create Book (Admin Only)
```http
POST /api/library/books
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Introduction to Algorithms",
  "author": "Thomas H. Cormen",
  "isbn": "978-0262033848",
  "category": "Computer Science",
  "totalCopies": 5,
  "availableCopies": 5
}
```

#### Borrow Book
```http
POST /api/library/borrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": "book_object_id",
  "studentId": "student_object_id",
  "dueDate": "2024-11-24"
}
```

#### Return Book
```http
POST /api/library/return/:borrowRecordId
Authorization: Bearer <token>
```

### Notifications

#### Create Notification (Admin Only)
```http
POST /api/notifications
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Exam Schedule Released",
  "message": "Final exam schedule has been published",
  "type": "exam",
  "priority": "high",
  "targetAudience": "all"
}
```

#### Get Notifications for Student
```http
GET /api/notifications/student/:studentId
Authorization: Bearer <token>
```

#### Mark as Read
```http
POST /api/notifications/:id/read
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student_object_id"
}
```

### Timetable

#### Create Timetable Entry (Admin Only)
```http
POST /api/timetable
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "semester": 1,
  "section": "A",
  "academicYear": "2024-25",
  "dayOfWeek": "Monday",
  "subject": "Mathematics",
  "faculty": "Dr. Smith",
  "startTime": "09:00 AM",
  "endTime": "10:00 AM",
  "room": "Room 101",
  "type": "Lecture"
}
```

#### Get Timetable
```http
GET /api/timetable/semester/:semester/section/:section
Authorization: Bearer <token>
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **Admin**: Full access to all CRUD operations
- **Student**: Read access to own data, limited write access

## ⚙️ Database Seeding

To populate the database with sample data:

```bash
npm run seed
```

## 🧪 Testing

Test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend application

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/student-erp |
| JWT_SECRET | Secret key for JWT | (required) |
| JWT_EXPIRE | Token expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5174 |

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create student-erp-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Railway

1. Create new project on Railway
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### MongoDB Atlas

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Environment variables for sensitive data
- Role-based access control

## 📄 License

MIT

## 👨‍💻 Author

Student ERP Team

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 📞 Support

For issues or questions, create an issue on GitHub.

---

**🎓 Built for modern educational institutions**
