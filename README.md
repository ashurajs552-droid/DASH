# Student ERP Dashboard

A modern, full-featured Student ERP (Enterprise Resource Planning) system built with React, TypeScript, and Tailwind CSS.

## Features

### 🎓 Student Portal

**Core Academic Features:**
- **Dashboard Overview** - Complete student profile with CGPA, attendance, and performance metrics
- **Progress Reports** - Detailed grade tracking with CGPA calculation and trend analysis
- **Attendance Tracking** - Real-time attendance monitoring with percentage display and alerts

**Scheduling & Calendar:**
- **Timetable** 📅 - Weekly class schedule with lecture/lab/tutorial tracking
- **Academic Calendar** 🗓️ - Interactive calendar with events, exams, holidays, and assignment deadlines
- **Exam Schedule** 📝 - Comprehensive exam management with admit cards and results

**Resource Management:**
- **Library System** 📚 - Browse, borrow, return books with due date tracking
- **Fee Management** 💰 - Track payments, pending fees, payment history, and multiple payment methods
- **Document Management** 📄 - Upload, organize, and access academic documents

**AI-Powered Learning Tools:**
- **AI Chat Assistant** 🤖 - Real-time AI tutor for homework help and concept explanations
- **AI Assignment Generator** ✨ - Create personalized practice assignments with custom difficulty levels
- **My Notes** 📝 - Smart note-taking with search, tags, pinning, and subject categorization
- **Student AI Tools** 🛠️ - Six specialized tools:
  - Essay Writing Helper
  - Math Problem Solver  
  - Study Plan Generator
  - Concept Explainer
  - Lab Report Assistant
  - Practice Quiz Generator

**Communication & Alerts:**
- **Notifications Center** 🔔 - Real-time updates for academic, exam, and fee-related information
- **Performance Analytics** 📊 - Detailed insights, trends, strengths, and improvement areas

**UI/UX:**
- **12 Feature Tabs** - Easy navigation between all features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern Animations** - Smooth transitions and beautiful gradients
- **Dark/Light themes** - Professional color schemes

### 👨‍💼 Admin Portal
- **Student Management** - Add, edit, and manage student records
- **Grade Entry** - Input and manage student grades by subject and semester
- **Attendance Management** - Mark daily attendance for students
- **Dashboard Analytics** - Overview of all students and their performance

## Demo Credentials

### Student Login
- **Email:** `student@demo.com`
- **Password:** `password`

### Admin Login
- **Email:** `admin@demo.com`
- **Password:** `password`

## Technology Stack

- **Frontend:** React 18 with TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Build Tool:** Vite
- **UI Components:** Headless UI

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
student-erp-dashboard/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin-specific components
│   │   │   ├── AttendanceForm.tsx
│   │   │   ├── GradeForm.tsx
│   │   │   └── StudentForm.tsx
│   │   ├── student/         # Student-specific components
│   │   │   ├── AIChatbot.tsx       # AI Chat Assistant
│   │   │   ├── AIAssignment.tsx    # AI Assignment Generator
│   │   │   ├── MyNotes.tsx         # Notes Management
│   │   │   ├── EducatorAI.tsx      # AI Student Tools
│   │   │   ├── AttendanceView.tsx
│   │   │   ├── ProgressReport.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── ProgressChart.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── data/
│   │   └── mockData.ts      # Mock data for demo
│   ├── pages/
│   │   ├── AdminDashboard.tsx
│   │   ├── Login.tsx
│   │   └── StudentDashboard.tsx
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Features in Detail

### Student Dashboard

#### Overview Tab
- **Profile Overview**: View student information including ID, course, and semester
- **Academic Performance**: 
  - CGPA display with visual progress bars
  - Overall attendance percentage with trend indicators
  - Subject-wise grades with percentage calculation
  - Performance charts and analytics
- **Attendance Records**: Detailed view of attendance by date and subject
- **Warnings**: Alerts when attendance falls below 75%

#### AI Assistant Tab 🤖
- **Interactive Chat**: Real-time conversation with AI study assistant
- **Smart Responses**: Context-aware answers for:
  - Homework and assignment help
  - Exam preparation tips
  - Concept explanations
  - Study strategies
  - Programming help
  - Essay writing guidance
- **Chat History**: View previous messages in the conversation
- **Floating Chat Button**: Easy access from any tab

#### AI Assignments Tab ✨
- **Personalized Generation**: Create custom assignments based on:
  - Subject selection
  - Topic input
  - Difficulty level (Easy/Medium/Hard)
- **Detailed Content**: Generated assignments include:
  - Clear instructions and objectives
  - Step-by-step problems or tasks
  - Estimated completion time
  - Topic tags for organization
- **Save & Export**: Download assignments as PDF or save for later

#### My Notes Tab 📝
- **Note Creation**: Add notes with title, subject, content, and tags
- **Organization Features**:
  - Pin important notes
  - Tag-based categorization
  - Subject-wise color coding
  - Search functionality across all note fields
- **Note Management**: Edit, delete, and organize your study materials
- **Timestamps**: Track when notes were created and last updated

#### Student Tools Tab 🛠️
Six AI-powered educational tools:

1. **Essay Writing Helper**
   - Structure guidance (Introduction, Body, Conclusion)
   - Thesis statement assistance
   - Formatting tips and best practices

2. **Math Problem Solver**
   - Step-by-step solutions
   - Formula explanations
   - Work verification methods

3. **Study Plan Generator**
   - Personalized study schedules
   - Weekly breakdown with time allocation
   - Progress tracking tips

4. **Concept Explainer**
   - Simplify complex topics
   - Real-world analogies
   - Common misconceptions clarified

5. **Lab Report Assistant**
   - Complete report structure
   - Scientific method guidance
   - Data presentation tips

6. **Practice Quiz Generator**
   - Custom quiz creation
   - Multiple choice and short answer questions
   - Solutions and explanations provided

### Admin Dashboard
- **Student Management**:
  - Add new students with all required details
  - View all students in a table format
  - Edit student information
- **Grade Management**:
  - Add grades for students by subject
  - Set marks and total marks
  - Automatic grade calculation
- **Attendance Management**:
  - Mark attendance (Present/Absent/Late)
  - Track by date and subject
  - Support for multiple students

## Authentication System

The application uses a context-based authentication system with:
- Role-based access control (Student/Admin)
- Protected routes
- Automatic redirection based on user role
- Mock authentication (replace with real API in production)

## Customization

### Adding Real API Integration
Replace the mock data in `src/data/mockData.ts` with actual API calls to your backend.

### Styling
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Adding Features
The modular structure makes it easy to add new features:
1. Create new components in appropriate folders
2. Add routes in `App.tsx`
3. Update types in `src/types/index.ts`

## Key Features Implemented ✅

- ✅ AI Chat Assistant for homework help
- ✅ AI Assignment Generator
- ✅ Notes Management System
- ✅ Student Educational Tools (6 AI-powered tools)
- ✅ Real-time progress tracking
- ✅ Attendance management
- ✅ Grade management
- ✅ Role-based authentication
- ✅ Responsive design with animations

## Future Enhancements

- [ ] Fee management module
- [ ] Timetable/Schedule management
- [ ] Assignment submission and tracking system
- [ ] Parent portal with student progress view
- [ ] Push notifications for deadlines
- [ ] Advanced PDF export for all reports
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Real-time collaboration on notes
- [ ] Integration with external learning platforms
- [ ] Video conferencing for online classes
- [ ] Calendar integration for exam schedules

## License

MIT

## Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

**Quick Deploy:**
1. Push to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select this repository
5. Click "Deploy"

**Via CLI:**
```bash
npm install -g vercel
vercel
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ashurajs552-droid/ERP)

## Support

For issues or questions, please open an issue in the repository.
