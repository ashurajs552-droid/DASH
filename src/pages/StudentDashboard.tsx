import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getStudentProgressReport } from '../data/mockData';
import ProgressReport from '../components/student/ProgressReport';
import AttendanceView from '../components/student/AttendanceView';
import StatCard from '../components/StatCard';
import ProgressChart from '../components/ProgressChart';
import AIChatbot, { ChatButton } from '../components/student/AIChatbot';
import AIAssignment from '../components/student/AIAssignment';
import MyNotes from '../components/student/MyNotes';
import EducatorAI from '../components/student/EducatorAI';
import Timetable from '../components/student/Timetable';
import Library from '../components/student/Library';
import FeeManagement from '../components/student/FeeManagement';
import ExamSchedule from '../components/student/ExamSchedule';
import Notifications from '../components/student/Notifications';
import PerformanceAnalytics from '../components/student/PerformanceAnalytics';
import Calendar from '../components/student/Calendar';
import { 
  UserCircleIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon,
  SparklesIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  if (!user || !user.studentId) {
    return <div>Loading...</div>;
  }

  const progressData = getStudentProgressReport(user.studentId);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'timetable', name: 'Timetable', icon: CalendarIcon },
    { id: 'library', name: 'Library', icon: BookOpenIcon },
    { id: 'fees', name: 'Fees', icon: DocumentTextIcon },
    { id: 'exams', name: 'Exams', icon: AcademicCapIcon },
    { id: 'notifications', name: 'Notifications', icon: SparklesIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
    { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
    { id: 'ai-assistant', name: 'AI Chat', icon: SparklesIcon },
    { id: 'assignments', name: 'AI Assignments', icon: DocumentTextIcon },
    { id: 'notes', name: 'Notes', icon: PencilSquareIcon },
    { id: 'tools', name: 'AI Tools', icon: WrenchScrewdriverIcon }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2 sticky top-0 z-10">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
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
      )}

      {/* AI Assistant Tab */}
      {activeTab === 'ai-assistant' && (
        <div className="animate-fade-in">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Study Assistant</h2>
            <p className="text-gray-600">
              Your personal AI tutor is here to help! Ask questions, get explanations, 
              or receive homework help. Click the chat button below to start a conversation.
            </p>
          </div>
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <SparklesIcon className="h-20 w-20 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Chat Assistant</h3>
            <p className="text-gray-600 mb-6">Click the chat button in the bottom-right corner to start chatting!</p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Open AI Chat
            </button>
          </div>
        </div>
      )}

      {/* AI Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="animate-fade-in">
          <AIAssignment />
        </div>
      )}

      {/* My Notes Tab */}
      {activeTab === 'notes' && (
        <div className="animate-fade-in">
          <MyNotes />
        </div>
      )}

      {/* Student Tools Tab */}
      {activeTab === 'tools' && (
        <div className="animate-fade-in">
          <EducatorAI />
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="animate-fade-in">
          <Timetable />
        </div>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <div className="animate-fade-in">
          <Library />
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="animate-fade-in">
          <FeeManagement />
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div className="animate-fade-in">
          <ExamSchedule />
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="animate-fade-in">
          <Notifications />
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="animate-fade-in">
          <PerformanceAnalytics />
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="animate-fade-in">
          <Calendar />
        </div>
      )}

      {/* Floating Chat Button - Only show when chat is closed */}
      {!isChatOpen && <ChatButton onClick={() => setIsChatOpen(true)} />}
      
      {/* AI Chatbot */}
      <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
