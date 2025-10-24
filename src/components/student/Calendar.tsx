import { useState } from 'react';
import { 
  CalendarIcon,
  AcademicCapIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'exam' | 'assignment' | 'holiday' | 'event';
  description: string;
}

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  const events: Event[] = [
    {
      id: 1,
      title: 'Mathematics Final Exam',
      date: '2024-11-20',
      time: '9:00 AM - 12:00 PM',
      location: 'Exam Hall A',
      type: 'exam',
      description: 'Final examination for Calculus course'
    },
    {
      id: 2,
      title: 'Physics Assignment Due',
      date: '2024-11-15',
      time: '11:59 PM',
      location: 'Online Submission',
      type: 'assignment',
      description: 'Submit Quantum Mechanics assignment'
    },
    {
      id: 3,
      title: 'Thanksgiving Break',
      date: '2024-11-28',
      time: 'All Day',
      location: 'Campus Closed',
      type: 'holiday',
      description: 'University holiday'
    },
    {
      id: 4,
      title: 'Computer Science Project Presentation',
      date: '2024-11-18',
      time: '2:00 PM - 4:00 PM',
      location: 'Lab 301',
      type: 'event',
      description: 'Final project presentation'
    },
    {
      id: 5,
      title: 'Chemistry Lab Report Due',
      date: '2024-11-12',
      time: '5:00 PM',
      location: 'Online Submission',
      type: 'assignment',
      description: 'Submit organic chemistry lab report'
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'exam': return 'bg-red-100 text-red-800 border-red-200';
      case 'assignment': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'holiday': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'exam': return '📝';
      case 'assignment': return '📄';
      case 'holiday': return '🎉';
      case 'event': return '🎯';
      default: return '📅';
    }
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
            <CalendarIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Academic Calendar</h2>
            <p className="text-sm text-gray-600">Track your important dates</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <div className="flex items-center justify-between text-white">
                <button
                  onClick={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  ←
                </button>
                <h3 className="text-xl font-bold">
                  {months[selectedMonth]} {selectedYear}
                </h3>
                <button
                  onClick={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isToday = day === today && selectedMonth === currentMonth;
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-20 p-2 rounded-lg border-2 transition-all ${
                        day
                          ? isToday
                            ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                            : dayEvents.length > 0
                            ? 'bg-blue-50 border-blue-200 hover:border-blue-400 cursor-pointer'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-bold mb-1 ${isToday ? 'text-indigo-600' : 'text-gray-900'}`}>
                            {day}
                          </div>
                          {dayEvents.length > 0 && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1 py-0.5 rounded truncate ${getTypeColor(event.type)}`}
                                  title={event.title}
                                >
                                  {getTypeIcon(event.type)} {event.title.slice(0, 10)}...
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-gray-600">+{dayEvents.length - 2} more</div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-gradient-to-br ${getTypeColor(event.type).replace('bg-', 'from-').replace(' text-', ' to-').split(' ')[0]} rounded-xl p-4 border-2 ${getTypeColor(event.type).split(' ')[2]}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">{getTypeIcon(event.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <AcademicCapIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No upcoming events</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <h4 className="font-bold text-gray-900 mb-3">This Month</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">📝 Exams</span>
                <span className="font-bold text-red-600">
                  {events.filter(e => e.type === 'exam' && new Date(e.date).getMonth() === selectedMonth).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">📄 Assignments</span>
                <span className="font-bold text-blue-600">
                  {events.filter(e => e.type === 'assignment' && new Date(e.date).getMonth() === selectedMonth).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🎉 Holidays</span>
                <span className="font-bold text-green-600">
                  {events.filter(e => e.type === 'holiday' && new Date(e.date).getMonth() === selectedMonth).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">🎯 Events</span>
                <span className="font-bold text-purple-600">
                  {events.filter(e => e.type === 'event' && new Date(e.date).getMonth() === selectedMonth).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
