# Student ERP Dashboard

A modern, full-featured Student ERP (Enterprise Resource Planning) system built with React, TypeScript, and Tailwind CSS.

## Features

### 🎓 Student Portal
- **Login Authentication** - Secure login with role-based access
- **Progress Reports** - View grades and academic performance with CGPA calculation
- **Attendance Tracking** - Real-time attendance monitoring with percentage display
- **Beautiful UI** - Modern, responsive design with Tailwind CSS

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
│   │   │   ├── AttendanceView.tsx
│   │   │   └── ProgressReport.tsx
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
- **Profile Overview**: View student information including ID, course, and semester
- **Academic Performance**: 
  - CGPA display
  - Overall attendance percentage
  - Subject-wise grades with percentage calculation
- **Attendance Records**: Detailed view of attendance by date and subject
- **Warnings**: Alerts when attendance falls below 75%

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

## Future Enhancements

- [ ] Fee management module
- [ ] Timetable/Schedule management
- [ ] Assignment submission system
- [ ] Parent portal
- [ ] Push notifications
- [ ] Export reports to PDF
- [ ] Multi-language support
- [ ] Dark mode

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
