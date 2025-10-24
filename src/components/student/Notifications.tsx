import { useState } from 'react';
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'announcement';
  category: 'academic' | 'fee' | 'exam' | 'general';
  timestamp: Date;
  isRead: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Exam Schedule Released',
      message: 'Final semester exam schedule has been published. Please check the exam dates and prepare accordingly.',
      type: 'announcement',
      category: 'exam',
      timestamp: new Date('2024-10-24T10:00:00'),
      isRead: false
    },
    {
      id: 2,
      title: 'Fee Payment Reminder',
      message: 'Your library fee of $200 is due on November 1st, 2024. Please make the payment to avoid late fees.',
      type: 'warning',
      category: 'fee',
      timestamp: new Date('2024-10-23T14:30:00'),
      isRead: false
    },
    {
      id: 3,
      title: 'Assignment Submitted Successfully',
      message: 'Your Mathematics assignment has been submitted successfully and is under review.',
      type: 'success',
      category: 'academic',
      timestamp: new Date('2024-10-22T16:45:00'),
      isRead: true
    },
    {
      id: 4,
      title: 'Library Book Due Soon',
      message: 'The book "Advanced Calculus" is due for return on October 30th. Please return or renew it.',
      type: 'info',
      category: 'general',
      timestamp: new Date('2024-10-21T09:15:00'),
      isRead: false
    },
    {
      id: 5,
      title: 'Attendance Below 75%',
      message: 'Your attendance in Computer Science has dropped to 72%. Please maintain at least 75% to be eligible for exams.',
      type: 'warning',
      category: 'academic',
      timestamp: new Date('2024-10-20T11:00:00'),
      isRead: true
    },
    {
      id: 6,
      title: 'New Course Material Available',
      message: 'Physics lecture notes for Unit 5 have been uploaded. Access them from the course materials section.',
      type: 'info',
      category: 'academic',
      timestamp: new Date('2024-10-19T13:30:00'),
      isRead: true
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'academic' | 'exam' | 'fee'>('all');

  const filteredNotifications = notifications.filter(notif => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notif.isRead;
    return notif.category === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />;
      case 'announcement':
        return <AcademicCapIcon className="h-6 w-6 text-indigo-600" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'success': return 'from-green-50 to-emerald-50 border-green-200';
      case 'warning': return 'from-orange-50 to-red-50 border-orange-200';
      case 'announcement': return 'from-indigo-50 to-purple-50 border-indigo-200';
      default: return 'from-blue-50 to-cyan-50 border-blue-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl relative">
            <BellIcon className="h-6 w-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-600">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'unread', 'academic', 'exam', 'fee'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
              selectedFilter === filter
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter}
            {filter === 'unread' && unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-gradient-to-br ${getTypeColor(notif.type)} rounded-xl p-5 border-2 transition-all hover:shadow-lg ${
              !notif.isRead ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {notif.title}
                      {!notif.isRead && (
                        <span className="ml-2 inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{notif.message}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{formatTime(notif.timestamp)}</span>
                    </span>
                    <span className="px-2 py-1 bg-white rounded-full font-semibold">
                      {notif.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {!notif.isRead && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No notifications found</p>
          <p className="text-gray-400 text-sm mt-2">You're all caught up!</p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded" defaultChecked />
            <span className="text-gray-700">Email notifications for important updates</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded" defaultChecked />
            <span className="text-gray-700">SMS alerts for exam schedules</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded" defaultChecked />
            <span className="text-gray-700">Push notifications for assignments</span>
          </label>
        </div>
      </div>
    </div>
  );
}
