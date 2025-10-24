import { CalendarIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { AttendanceRecord } from '../../types';

interface AttendanceViewProps {
  attendance: AttendanceRecord[];
  overallAttendance: number;
}

export default function AttendanceView({ attendance, overallAttendance }: AttendanceViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'late':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Attendance</h2>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-lg">
          <div>
            <p className="text-xs text-gray-600">Overall</p>
            <p className={`text-xl font-bold ${getAttendanceColor(overallAttendance)}`}>
              {overallAttendance}%
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {attendance.map((record, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getStatusIcon(record.status)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{record.subject}</p>
                <p className="text-xs text-gray-500">{formatDate(record.date)}</p>
              </div>
            </div>
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(
                record.status
              )}`}
            >
              {record.status}
            </span>
          </div>
        ))}
      </div>

      {attendance.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500 text-lg">No attendance records available.</p>
        </div>
      )}

      {overallAttendance < 75 && attendance.length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">
            <strong>Warning:</strong> Your attendance is below 75%. Please maintain regular attendance.
          </p>
        </div>
      )}
    </div>
  );
}
