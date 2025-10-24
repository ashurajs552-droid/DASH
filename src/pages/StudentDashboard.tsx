import { useAuth } from '../contexts/AuthContext';
import { getStudentProgressReport } from '../data/mockData';
import ProgressReport from '../components/student/ProgressReport';
import AttendanceView from '../components/student/AttendanceView';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  if (!user || !user.studentId) {
    return <div>Loading...</div>;
  }

  const progressData = getStudentProgressReport(user.studentId);

  return (
    <div className="space-y-6">
      {/* Student Profile Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full p-3">
            <UserCircleIcon className="h-16 w-16 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{progressData.student.name}</h1>
            <p className="text-indigo-100">Student ID: {progressData.student.studentId}</p>
            <p className="text-indigo-100">{progressData.student.course} - Semester {progressData.student.semester}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">CGPA</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{progressData.cgpa.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{progressData.overallAttendance}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Subjects</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">{progressData.grades.length}</p>
        </div>
      </div>

      {/* Progress Report */}
      <ProgressReport grades={progressData.grades} cgpa={progressData.cgpa} />

      {/* Attendance View */}
      <AttendanceView 
        attendance={progressData.attendance} 
        overallAttendance={progressData.overallAttendance} 
      />
    </div>
  );
}
