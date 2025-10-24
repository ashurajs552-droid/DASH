import { 
  ChartBarIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface SubjectPerformance {
  subject: string;
  currentGrade: number;
  previousGrade: number;
  trend: 'up' | 'down' | 'stable';
  attendance: number;
  assignments: { completed: number; total: number };
}

export default function PerformanceAnalytics() {
  const subjectPerformance: SubjectPerformance[] = [
    {
      subject: 'Mathematics',
      currentGrade: 92,
      previousGrade: 88,
      trend: 'up',
      attendance: 95,
      assignments: { completed: 10, total: 10 }
    },
    {
      subject: 'Computer Science',
      currentGrade: 88,
      previousGrade: 90,
      trend: 'down',
      attendance: 92,
      assignments: { completed: 8, total: 10 }
    },
    {
      subject: 'Physics',
      currentGrade: 85,
      previousGrade: 85,
      trend: 'stable',
      attendance: 90,
      assignments: { completed: 9, total: 10 }
    },
    {
      subject: 'Chemistry',
      currentGrade: 90,
      previousGrade: 87,
      trend: 'up',
      attendance: 88,
      assignments: { completed: 10, total: 10 }
    }
  ];

  const overallCGPA = 9.1;
  const previousCGPA = 8.9;
  const overallAttendance = 91;
  const rank = 12;

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />;
    if (trend === 'down') return <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />;
    return <span className="text-gray-400">—</span>;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
            <ChartBarIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
            <p className="text-sm text-gray-600">Track your academic progress</p>
          </div>
        </div>
      </div>

      {/* Overall Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">CGPA</span>
            <TrophyIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-indigo-600">{overallCGPA}</div>
          <div className="flex items-center space-x-1 mt-1">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-600">+{(overallCGPA - previousCGPA).toFixed(1)} from last semester</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Attendance</span>
            <ChartBarIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">{overallAttendance}%</div>
          <p className="text-xs text-gray-600 mt-1">Above minimum requirement</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Class Rank</span>
            <TrophyIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-600">#{rank}</div>
          <p className="text-xs text-gray-600 mt-1">Out of 120 students</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Assignments</span>
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {subjectPerformance.reduce((acc, s) => acc + s.assignments.completed, 0)}/
            {subjectPerformance.reduce((acc, s) => acc + s.assignments.total, 0)}
          </div>
          <p className="text-xs text-gray-600 mt-1">Completed this semester</p>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Subject-wise Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Current Grade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Assignments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subjectPerformance.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{subject.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-indigo-600">{subject.currentGrade}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(subject.trend)}
                      <span className={`text-sm font-semibold ${getTrendColor(subject.trend)}`}>
                        {subject.trend === 'up' && `+${subject.currentGrade - subject.previousGrade}%`}
                        {subject.trend === 'down' && `${subject.currentGrade - subject.previousGrade}%`}
                        {subject.trend === 'stable' && 'No change'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                        <div
                          className={`h-2 rounded-full ${
                            subject.attendance >= 85 ? 'bg-green-500' : 
                            subject.attendance >= 75 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${subject.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{subject.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      subject.assignments.completed === subject.assignments.total
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {subject.assignments.completed}/{subject.assignments.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <TrophyIcon className="h-6 w-6 text-green-600 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Excellent performance in Mathematics (92%)</span>
            </li>
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>100% assignment completion in Math & Chemistry</span>
            </li>
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Consistent attendance above 88%</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-orange-600">!</span>
              <span>Computer Science grade decreased by 2%</span>
            </li>
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-orange-600">!</span>
              <span>2 pending assignments in Computer Science</span>
            </li>
            <li className="flex items-center space-x-2 text-sm text-gray-700">
              <span className="text-orange-600">!</span>
              <span>Chemistry attendance needs improvement</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Semester Comparison Chart */}
      <div className="mt-6 bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Semester Progress</h3>
        <div className="space-y-4">
          {subjectPerformance.map((subject, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{subject.subject}</span>
                <span className="text-sm text-gray-600">
                  Previous: {subject.previousGrade}% → Current: {subject.currentGrade}%
                </span>
              </div>
              <div className="relative bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-indigo-600 opacity-30 transition-all"
                  style={{ width: `${subject.previousGrade}%` }}
                ></div>
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
                  style={{ width: `${subject.currentGrade}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
