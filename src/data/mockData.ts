import { Student, AttendanceRecord, GradeRecord, ProgressReport } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@demo.com',
    studentId: 'STU2024001',
    course: 'Computer Science',
    semester: 3,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@demo.com',
    studentId: 'STU2024002',
    course: 'Information Technology',
    semester: 2,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@demo.com',
    studentId: 'STU2024003',
    course: 'Computer Science',
    semester: 4,
  },
];

export const mockAttendance: AttendanceRecord[] = [
  { date: '2024-10-23', subject: 'Data Structures', status: 'present' },
  { date: '2024-10-23', subject: 'Algorithms', status: 'present' },
  { date: '2024-10-22', subject: 'Database Systems', status: 'present' },
  { date: '2024-10-22', subject: 'Web Development', status: 'late' },
  { date: '2024-10-21', subject: 'Data Structures', status: 'absent' },
  { date: '2024-10-21', subject: 'Operating Systems', status: 'present' },
  { date: '2024-10-20', subject: 'Algorithms', status: 'present' },
  { date: '2024-10-20', subject: 'Database Systems', status: 'present' },
];

export const mockGrades: GradeRecord[] = [
  { subject: 'Data Structures', marks: 85, totalMarks: 100, grade: 'A', semester: 3 },
  { subject: 'Algorithms', marks: 78, totalMarks: 100, grade: 'B+', semester: 3 },
  { subject: 'Database Systems', marks: 92, totalMarks: 100, grade: 'A+', semester: 3 },
  { subject: 'Web Development', marks: 88, totalMarks: 100, grade: 'A', semester: 3 },
  { subject: 'Operating Systems', marks: 75, totalMarks: 100, grade: 'B', semester: 2 },
  { subject: 'Computer Networks', marks: 82, totalMarks: 100, grade: 'A-', semester: 2 },
];

export const getStudentProgressReport = (studentId: string): ProgressReport => {
  const student = mockStudents.find(s => s.studentId === studentId) || mockStudents[0];
  
  // Calculate overall attendance
  const presentCount = mockAttendance.filter(a => a.status === 'present').length;
  const lateCount = mockAttendance.filter(a => a.status === 'late').length;
  const totalClasses = mockAttendance.length;
  const overallAttendance = Math.round(((presentCount + (lateCount * 0.5)) / totalClasses) * 100);

  // Calculate CGPA
  const gradePoints: { [key: string]: number } = {
    'A+': 10, 'A': 9, 'A-': 8.5,
    'B+': 8, 'B': 7, 'B-': 6.5,
    'C+': 6, 'C': 5, 'C-': 4.5,
    'D': 4, 'F': 0
  };
  
  const totalGradePoints = mockGrades.reduce((sum, grade) => sum + (gradePoints[grade.grade] || 0), 0);
  const cgpa = totalGradePoints / mockGrades.length;

  return {
    student,
    overallAttendance,
    grades: mockGrades,
    attendance: mockAttendance,
    cgpa,
  };
};

export const getAllStudents = (): Student[] => {
  return mockStudents;
};
