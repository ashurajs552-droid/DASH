import { useState } from 'react';
import { getAllStudents } from '../data/mockData';
import { PlusIcon, PencilIcon, UsersIcon, ChartBarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import StudentForm from '../components/admin/StudentForm';
import GradeForm from '../components/admin/GradeForm';
import AttendanceForm from '../components/admin/AttendanceForm';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const [students] = useState(getAllStudents());
  const [activeTab, setActiveTab] = useState<'students' | 'grades' | 'attendance'>('students');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showGradeForm, setShowGradeForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Admin Hero Header */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="animated-gradient p-8">
          <div className="glass p-6 rounded-xl">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/90 text-lg">Manage student records, grades, and attendance with ease</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={<UsersIcon className="h-8 w-8" />}
          color="indigo"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Courses"
          value={new Set(students.map(s => s.course)).size}
          icon={<ChartBarIcon className="h-8 w-8" />}
          color="purple"
        />
        <StatCard
          title="This Week"
          value="98%"
          icon={<CalendarDaysIcon className="h-8 w-8" />}
          color="green"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Modern Tabs */}
      <div className="card-gradient animate-scale-in">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('students')}
            className={`${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            } px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2`}
          >
            <UsersIcon className="h-5 w-5" />
            Students
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`${
              activeTab === 'grades'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            } px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2`}
          >
            <ChartBarIcon className="h-5 w-5" />
            Grades
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`${
              activeTab === 'attendance'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            } px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2`}
          >
            <CalendarDaysIcon className="h-5 w-5" />
            Attendance
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <UsersIcon className="h-7 w-7 mr-2 text-indigo-600" />
                  Student Management
                </h2>
                <button
                  onClick={() => setShowStudentForm(true)}
                  className="btn-primary"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Student
                </button>
              </div>

              {/* Modern Students Table */}
              <div className="overflow-x-auto custom-scrollbar">
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Semester</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <span className="badge badge-info">{student.studentId}</span>
                        </td>
                        <td className="font-semibold text-gray-900">{student.name}</td>
                        <td className="text-gray-600">{student.email}</td>
                        <td>
                          <span className="badge badge-success">{student.course}</span>
                        </td>
                        <td>
                          <span className="badge">{student.semester}</span>
                        </td>
                        <td>
                          <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group">
                            <PencilIcon className="h-5 w-5 text-indigo-600 group-hover:text-indigo-800" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ChartBarIcon className="h-7 w-7 mr-2 text-indigo-600" />
                  Grade Management
                </h2>
                <button
                  onClick={() => setShowGradeForm(true)}
                  className="btn-primary"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Grade
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
                <ChartBarIcon className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700">Select a student to manage their grades</p>
                <p className="text-sm text-gray-500 mt-2">Click "Add Grade" to get started</p>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <CalendarDaysIcon className="h-7 w-7 mr-2 text-indigo-600" />
                  Attendance Management
                </h2>
                <button
                  onClick={() => setShowAttendanceForm(true)}
                  className="btn-primary"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Mark Attendance
                </button>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 text-center border border-green-100">
                <CalendarDaysIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700">Mark attendance for students</p>
                <p className="text-sm text-gray-500 mt-2">Click "Mark Attendance" to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showStudentForm && <StudentForm onClose={() => setShowStudentForm(false)} />}
      {showGradeForm && <GradeForm onClose={() => setShowGradeForm(false)} students={students} />}
      {showAttendanceForm && <AttendanceForm onClose={() => setShowAttendanceForm(false)} students={students} />}
    </div>
  );
}
