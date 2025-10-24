export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  course: string;
  semester: number;
  profileImage?: string;
}

export interface AttendanceRecord {
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late';
}

export interface GradeRecord {
  subject: string;
  marks: number;
  totalMarks: number;
  grade: string;
  semester: number;
}

export interface ProgressReport {
  student: Student;
  overallAttendance: number;
  grades: GradeRecord[];
  attendance: AttendanceRecord[];
  cgpa: number;
}
