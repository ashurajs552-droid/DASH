# 🚀 Quick Start Guide - Student ERP Backend

Get your backend running in 5 minutes!

## ✅ Prerequisites Check

```bash
# Check Node.js version (need v16+)
node --version

# Check MongoDB installation
mongod --version

# Check npm
npm --version
```

## 📦 Step-by-Step Setup

### 1. Install Dependencies

```bash
cd student-erp-backend
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- cors, dotenv, morgan, express-validator

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Use it in step 3

### 3. Configure Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student-erp
JWT_SECRET=change-this-to-a-random-secure-string
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5174
```

**Important:** Change `JWT_SECRET` to a random secure string!

### 4. Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 http://localhost:5000
```

### 5. Test the API

Open browser or Postman and go to:
```
http://localhost:5000
```

You should see:
```json
{
  "message": "Student ERP Backend API",
  "version": "1.0.0",
  "status": "running"
}
```

## 🧪 Testing the API

### Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "password",
    "role": "admin",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "password"
  }'
```

Copy the `token` from response!

### Create Student (using token)

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "studentId": "STU001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@demo.com",
    "program": "Computer Science",
    "semester": 1
  }'
```

### Get All Students

```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📚 Available Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student (Admin)
- `PUT /api/students/:id` - Update student (Admin)
- `DELETE /api/students/:id` - Delete student (Admin)
- `GET /api/students/:id/dashboard` - Get dashboard data

### Grades
- `GET /api/grades` - Get all grades (Admin)
- `GET /api/grades/student/:studentId` - Get student grades
- `POST /api/grades` - Create grade (Admin)
- `PUT /api/grades/:id` - Update grade (Admin)
- `DELETE /api/grades/:id` - Delete grade (Admin)

### Attendance
- `POST /api/attendance` - Mark attendance (Admin)
- `GET /api/attendance/student/:studentId` - Get student attendance
- `PUT /api/attendance/:id` - Update attendance (Admin)

### Fees
- `GET /api/fees/student/:studentId` - Get student fees
- `POST /api/fees` - Create fee (Admin)
- `POST /api/fees/:id/pay` - Pay fee
- `PUT /api/fees/:id` - Update fee (Admin)

### Exams
- `GET /api/exams` - Get all exams
- `GET /api/exams/upcoming` - Get upcoming exams
- `POST /api/exams` - Create exam (Admin)
- `PUT /api/exams/:id` - Update exam (Admin)

### Library
- `GET /api/library/books` - Get all books
- `POST /api/library/books` - Create book (Admin)
- `POST /api/library/borrow` - Borrow book
- `POST /api/library/return/:id` - Return book

### Notifications
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/student/:studentId` - Get student notifications
- `POST /api/notifications` - Create notification (Admin)
- `POST /api/notifications/:id/read` - Mark as read

### Timetable
- `GET /api/timetable/semester/:semester/section/:section` - Get timetable
- `POST /api/timetable` - Create timetable (Admin)
- `PUT /api/timetable/:id` - Update timetable (Admin)

## 🎯 Quick Test Workflow

### 1. Register Admin
```http
POST /api/auth/register
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "admin",
  "firstName": "Test",
  "lastName": "Admin"
}
```

### 2. Register Student
```http
POST /api/auth/register
{
  "email": "student@test.com",
  "password": "student123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe",
  "studentId": "STU001",
  "program": "Computer Science",
  "semester": 1
}
```

### 3. Login as Admin
```http
POST /api/auth/login
{
  "email": "admin@test.com",
  "password": "admin123"
}
```
Save the token!

### 4. Create Grade for Student
```http
POST /api/grades
Authorization: Bearer <admin_token>
{
  "studentId": "<student_mongodb_id>",
  "subject": "Mathematics",
  "semester": 1,
  "academicYear": "2024-25",
  "examType": "final",
  "marksObtained": 85,
  "totalMarks": 100
}
```

### 5. Mark Attendance
```http
POST /api/attendance
Authorization: Bearer <admin_token>
{
  "studentId": "<student_mongodb_id>",
  "subject": "Mathematics",
  "date": "2024-10-24",
  "status": "present",
  "semester": 1,
  "academicYear": "2024-25"
}
```

### 6. Create Fee
```http
POST /api/fees
Authorization: Bearer <admin_token>
{
  "studentId": "<student_mongodb_id>",
  "semester": "Fall 2024",
  "academicYear": "2024-25",
  "feeType": "tuition",
  "amount": 5000,
  "dueDate": "2024-12-31"
}
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB:
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux
net start MongoDB                     # Windows
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in .env or kill process:
```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>
```

### JWT Error
```
Error: jwt must be provided
```
**Solution:** Include Authorization header:
```
Authorization: Bearer <your_token>
```

### Validation Error
```
ValidationError: Path `email` is required
```
**Solution:** Check request body includes all required fields

## 📱 Connect Frontend

Update frontend API base URL:

```javascript
// In your React app
const API_URL = 'http://localhost:5000/api';

// Example API call
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password })
});
```

## 🎓 Next Steps

1. ✅ Backend running
2. ✅ Test with Postman/curl
3. 🔄 Connect frontend
4. 🔄 Seed database with sample data
5. 🔄 Deploy to production

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `BACKEND_COMPLETE_CODE.md` for all controller code
- Review model schemas in `models/` directory
- Test routes in `routes/` directory

---

**🚀 Your Student ERP Backend is ready!**

Access at: http://localhost:5000
