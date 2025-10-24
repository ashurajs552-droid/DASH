interface ProgressChartProps {
  subject: string;
  percentage: number;
  color: 'indigo' | 'green' | 'purple' | 'orange' | 'blue';
}

const colorClasses = {
  indigo: 'bg-indigo-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600',
  blue: 'bg-blue-600',
};

const lightColorClasses = {
  indigo: 'bg-indigo-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
  blue: 'bg-blue-100',
};

export default function ProgressChart({ subject, percentage, color }: ProgressChartProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{subject}</span>
        <span className="text-sm font-bold text-gray-900">{percentage}%</span>
      </div>
      <div className={`w-full h-3 rounded-full overflow-hidden ${lightColorClasses[color]}`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
