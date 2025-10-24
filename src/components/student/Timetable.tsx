import { useState } from 'react';
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface TimeSlot {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekSchedule: DaySchedule[] = [
    {
      day: 'Monday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
        { time: '10:00 AM - 11:00 AM', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', type: 'lab' },
        { time: '11:30 AM - 12:30 PM', subject: 'Chemistry', teacher: 'Dr. Williams', room: 'Room 102', type: 'lecture' },
        { time: '2:00 PM - 3:00 PM', subject: 'Computer Science', teacher: 'Prof. Davis', room: 'Lab 301', type: 'lab' },
        { time: '3:00 PM - 4:00 PM', subject: 'English', teacher: 'Ms. Brown', room: 'Room 103', type: 'tutorial' }
      ]
    },
    {
      day: 'Tuesday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Computer Science', teacher: 'Prof. Davis', room: 'Room 101', type: 'lecture' },
        { time: '10:00 AM - 11:00 AM', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 102', type: 'tutorial' },
        { time: '11:30 AM - 12:30 PM', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Room 201', type: 'lecture' },
        { time: '2:00 PM - 3:00 PM', subject: 'Chemistry', teacher: 'Dr. Williams', room: 'Lab 202', type: 'lab' }
      ]
    },
    {
      day: 'Wednesday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'English', teacher: 'Ms. Brown', room: 'Room 103', type: 'lecture' },
        { time: '10:00 AM - 11:00 AM', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Room 201', type: 'tutorial' },
        { time: '11:30 AM - 12:30 PM', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' },
        { time: '2:00 PM - 4:00 PM', subject: 'Computer Science', teacher: 'Prof. Davis', room: 'Lab 301', type: 'lab' }
      ]
    },
    {
      day: 'Thursday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Chemistry', teacher: 'Dr. Williams', room: 'Room 102', type: 'lecture' },
        { time: '10:00 AM - 11:00 AM', subject: 'English', teacher: 'Ms. Brown', room: 'Room 103', type: 'tutorial' },
        { time: '11:30 AM - 12:30 PM', subject: 'Computer Science', teacher: 'Prof. Davis', room: 'Room 101', type: 'lecture' },
        { time: '2:00 PM - 3:00 PM', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 102', type: 'tutorial' }
      ]
    },
    {
      day: 'Friday',
      slots: [
        { time: '9:00 AM - 10:00 AM', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', type: 'lab' },
        { time: '10:00 AM - 11:00 AM', subject: 'Chemistry', teacher: 'Dr. Williams', room: 'Lab 202', type: 'lab' },
        { time: '11:30 AM - 12:30 PM', subject: 'English', teacher: 'Ms. Brown', room: 'Room 103', type: 'lecture' },
        { time: '2:00 PM - 3:00 PM', subject: 'Project Work', teacher: 'Various', room: 'Labs', type: 'lab' }
      ]
    }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentSchedule = weekSchedule.find(s => s.day === selectedDay);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'tutorial': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl">
            <CalendarDaysIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Timetable</h2>
            <p className="text-sm text-gray-600">Weekly class schedule</p>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {currentSchedule?.slots.map((slot, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <ClockIcon className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900 text-lg">{slot.time}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(slot.type)}`}>
                    {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-indigo-600 mb-2">{slot.subject}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>👨‍🏫 {slot.teacher}</span>
                  <span>📍 {slot.room}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!currentSchedule || currentSchedule.slots.length === 0) && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <CalendarDaysIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No classes scheduled for this day</p>
          </div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-3">This Week Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {weekSchedule.reduce((acc, day) => acc + day.slots.length, 0)}
            </div>
            <div className="text-gray-600">Total Classes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {weekSchedule.reduce((acc, day) => 
                acc + day.slots.filter(s => s.type === 'lab').length, 0
              )}
            </div>
            <div className="text-gray-600">Lab Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {weekSchedule.reduce((acc, day) => 
                acc + day.slots.filter(s => s.type === 'tutorial').length, 0
              )}
            </div>
            <div className="text-gray-600">Tutorials</div>
          </div>
        </div>
      </div>
    </div>
  );
}
