import { ChartBarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { GradeRecord } from '../../types';

interface ProgressReportProps {
  grades: GradeRecord[];
  cgpa: number;
}

export default function ProgressReport({ grades, cgpa }: ProgressReportProps) {
  const calculatePercentage = (marks: number, totalMarks: number) => {
    return ((marks / totalMarks) * 100).toFixed(1);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ChartBarIcon className="h-8 w-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Progress Report</h2>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-lg">
          <TrophyIcon className="h-6 w-6 text-indigo-600" />
          <div>
            <p className="text-xs text-gray-600">CGPA</p>
            <p className="text-xl font-bold text-indigo-600">{cgpa.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {grade.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Semester {grade.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {grade.marks} / {grade.totalMarks}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {calculatePercentage(grade.marks, grade.totalMarks)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(
                      grade.grade
                    )}`}
                  >
                    {grade.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {grades.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No grades available yet.</p>
        </div>
      )}
    </div>
  );
}
