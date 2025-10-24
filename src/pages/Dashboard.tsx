import { ChartBarIcon, UserGroupIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Students', value: '2,345', icon: UserGroupIcon, change: '+12%', changeType: 'increase' },
  { name: 'Total Courses', value: '24', icon: BookOpenIcon, change: '+2', changeType: 'increase' },
  { name: 'Attendance Rate', value: '94.5%', icon: ChartBarIcon, change: '+3.2%', changeType: 'increase' },
  { name: 'Overall GPA', value: '3.8', icon: AcademicCapIcon, change: '+0.1', changeType: 'increase' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'submitted assignment', course: 'Mathematics 101', time: '2h ago' },
  { id: 2, user: 'Jane Smith', action: 'joined the course', course: 'Computer Science 201', time: '5h ago' },
  { id: 3, user: 'Alex Johnson', action: 'completed quiz', course: 'Physics 101', time: '1d ago' },
  { id: 4, user: 'Sarah Williams', action: 'asked a question in', course: 'Chemistry 201', time: '1d ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your school today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-b-lg">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4">
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">{activity.user}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            {activity.action} <span className="font-medium text-gray-900">{activity.course}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 px-4 py-3 text-right text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                View all activity
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="/students/add"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Add New Student</p>
                </div>
              </a>
              <a
                href="/courses/add"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <BookOpenIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Create Course</p>
                </div>
              </a>
              <a
                href="/attendance"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Take Attendance</p>
                </div>
              </a>
              <a
                href="/grades"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <AcademicCapIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Record Grades</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
