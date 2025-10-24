import { useAuth } from '../contexts/AuthContext';
import { getStudentProgressReport } from '../data/mockData';
import ProgressReport from '../components/student/ProgressReport';
import AttendanceView from '../components/student/AttendanceView';
import StatCard from '../components/StatCard';
import ProgressChart from '../components/ProgressChart';
import { 
  UserCircleIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  if (!user || !user.studentId) {
    return <div>Loading...</div>;
  }

  const progressData = getStudentProgressReport(user.studentId);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section with Profile */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="animated-gradient p-8">
          <div className="glass p-6 rounded-xl">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-full p-4 shadow-lg">
                  <UserCircleIcon className="h-20 w-20 text-indigo-600" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{progressData.student.name}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className="badge badge-info backdrop-blur-sm bg-white/20 text-white border-white/30">
                    ID: {progressData.student.studentId}
                  </span>
                  <span className="badge badge-info backdrop-blur-sm bg-white/20 text-white border-white/30">
                    {progressData.student.course}
                  </span>
                  <span className="badge badge-info backdrop-blur-sm bg-white/20 text-white border-white/30">
                    Semester {progressData.student.semester}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        <StatCard
          title="CGPA"
          value={progressData.cgpa.toFixed(2)}
          icon={<TrophyIcon className="h-8 w-8" />}
          color="indigo"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Attendance"
          value={`${progressData.overallAttendance}%`}
          icon={<CalendarIcon className="h-8 w-8" />}
          color="green"
          trend={{ value: 2, isPositive: progressData.overallAttendance >= 75 }}
        />
        <StatCard
          title="Total Subjects"
          value={progressData.grades.length}
          icon={<BookOpenIcon className="h-8 w-8" />}
          color="purple"
        />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Chart */}
        <div className="card-gradient animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Subject Performance
            </h2>
          </div>
          <div className="space-y-4">
            {progressData.grades.slice(0, 5).map((grade, index) => {
              const percentage = (grade.marks / grade.totalMarks) * 100;
              const colors: Array<'indigo' | 'green' | 'purple' | 'orange' | 'blue'> = ['indigo', 'green', 'purple', 'orange', 'blue'];
              return (
                <ProgressChart
                  key={index}
                  subject={grade.subject}
                  percentage={Math.round(percentage)}
                  color={colors[index % colors.length]}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Info Card */}
        <div className="card-gradient animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <AcademicCapIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Academic Summary
            </h2>
          </div>
          <div className="space-y-4">
            {/* CGPA Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Current CGPA</span>
                <span className="text-2xl font-bold gradient-text">{progressData.cgpa.toFixed(2)}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(progressData.cgpa / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Attendance Status */}
            <div className={`rounded-xl p-4 border ${
              progressData.overallAttendance >= 75 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100' 
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Attendance Status</span>
                <span className={`badge ${progressData.overallAttendance >= 75 ? 'badge-success' : 'badge-error'}`}>
                  {progressData.overallAttendance >= 75 ? 'Good' : 'Low'}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-600">
                  {progressData.overallAttendance >= 75 
                    ? 'Keep up the good work!' 
                    : 'Attendance below 75%. Please improve.'}
                </p>
              </div>
            </div>

            {/* Subjects Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Enrolled Subjects</span>
                <span className="badge badge-info">{progressData.grades.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {progressData.grades.slice(0, 4).map((grade, index) => (
                  <div key={index} className="bg-white rounded-lg p-2 text-xs">
                    <span className="font-medium text-gray-700">{grade.subject.split(' ')[0]}</span>
                    <span className={`ml-2 badge badge-${
                      grade.grade.includes('A') ? 'success' : 
                      grade.grade.includes('B') ? 'info' : 'warning'
                    } text-xs px-2 py-0.5`}>
                      {grade.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <ProgressReport grades={progressData.grades} cgpa={progressData.cgpa} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <AttendanceView 
          attendance={progressData.attendance} 
          overallAttendance={progressData.overallAttendance} 
        />
      </div>
    </div>
  );
}
