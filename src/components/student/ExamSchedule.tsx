import { useState } from 'react';
import { 
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Exam {
  id: number;
  subject: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  type: 'midterm' | 'final' | 'quiz';
  syllabus: string[];
  status: 'upcoming' | 'completed' | 'ongoing';
  marks?: number;
  totalMarks?: number;
}

export default function ExamSchedule() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const exams: Exam[] = [
    {
      id: 1,
      subject: 'Mathematics - Calculus',
      date: '2024-11-20',
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Exam Hall A',
      type: 'final',
      syllabus: ['Differentiation', 'Integration', 'Differential Equations', 'Applications'],
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Computer Science - Data Structures',
      date: '2024-11-22',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      room: 'Exam Hall B',
      type: 'final',
      syllabus: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Algorithms'],
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'Physics - Quantum Mechanics',
      date: '2024-11-25',
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Exam Hall C',
      type: 'final',
      syllabus: ['Wave Functions', 'Operators', 'Quantum States', 'Applications'],
      status: 'upcoming'
    },
    {
      id: 4,
      subject: 'Chemistry - Organic Chemistry',
      date: '2024-10-15',
      time: '10:00 AM - 11:30 AM',
      duration: '1.5 hours',
      room: 'Room 201',
      type: 'midterm',
      syllabus: ['Nomenclature', 'Reactions', 'Mechanisms'],
      status: 'completed',
      marks: 85,
      totalMarks: 100
    },
    {
      id: 5,
      subject: 'English - Literature',
      date: '2024-10-10',
      time: '2:00 PM - 4:00 PM',
      duration: '2 hours',
      room: 'Room 105',
      type: 'midterm',
      syllabus: ['Poetry Analysis', 'Essay Writing', 'Literary Devices'],
      status: 'completed',
      marks: 92,
      totalMarks: 100
    }
  ];

  const filteredExams = exams.filter(exam => {
    if (selectedFilter === 'all') return true;
    return exam.status === selectedFilter;
  });

  const upcomingExams = exams.filter(e => e.status === 'upcoming');
  const completedExams = exams.filter(e => e.status === 'completed');

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'final': return 'bg-red-100 text-red-800 border-red-200';
      case 'midterm': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'quiz': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysUntil = (dateStr: string) => {
    const examDate = new Date(dateStr);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl">
            <AcademicCapIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Exam Schedule</h2>
            <p className="text-sm text-gray-600">View your upcoming and past exams</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Upcoming Exams</span>
            <CalendarIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-600">{upcomingExams.length}</div>
          <p className="text-xs text-gray-600 mt-1">Scheduled this semester</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completed</span>
            <AcademicCapIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">{completedExams.length}</div>
          <p className="text-xs text-gray-600 mt-1">Results available</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Average Score</span>
            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {completedExams.length > 0
              ? Math.round(
                  completedExams.reduce((sum, e) => sum + (e.marks || 0), 0) / completedExams.length
                )
              : 0}%
          </div>
          <p className="text-xs text-gray-600 mt-1">Overall performance</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {(['all', 'upcoming', 'completed'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
              selectedFilter === filter
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Exam Cards */}
      <div className="space-y-4">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className={`bg-white rounded-xl p-6 border-2 transition-all hover:shadow-lg ${
              exam.status === 'upcoming' 
                ? 'border-orange-200 hover:border-orange-400' 
                : 'border-gray-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exam.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(exam.type)}`}>
                    {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    <span>{new Date(exam.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-green-600" />
                    <span>{exam.time} ({exam.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-purple-600" />
                    <span>{exam.room}</span>
                  </div>
                  {exam.status === 'upcoming' && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-orange-600">
                        {getDaysUntil(exam.date)} days remaining
                      </span>
                    </div>
                  )}
                </div>

                {/* Syllabus */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Syllabus:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.syllabus.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results for completed exams */}
                {exam.status === 'completed' && exam.marks !== undefined && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Your Score:</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          {exam.marks}/{exam.totalMarks}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({Math.round((exam.marks / (exam.totalMarks || 1)) * 100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 mt-4">
                  {exam.status === 'upcoming' ? (
                    <>
                      <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                        Download Admit Card
                      </button>
                      <button className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-all">
                        View Syllabus Details
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
                        View Answer Key
                      </button>
                      <button className="flex-1 bg-white text-green-600 border-2 border-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all">
                        Download Result
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No exams found for this filter</p>
        </div>
      )}
    </div>
  );
}
