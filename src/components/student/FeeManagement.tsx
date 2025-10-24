import { 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

interface FeeRecord {
  id: number;
  semester: string;
  type: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  transactionId?: string;
}

export default function FeeManagement() {
  const feeRecords: FeeRecord[] = [
    {
      id: 1,
      semester: 'Fall 2024',
      type: 'Tuition Fee',
      amount: 5000,
      dueDate: '2024-09-01',
      paidDate: '2024-08-28',
      status: 'paid',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      semester: 'Fall 2024',
      type: 'Lab Fee',
      amount: 500,
      dueDate: '2024-09-01',
      paidDate: '2024-08-28',
      status: 'paid',
      transactionId: 'TXN123456790'
    },
    {
      id: 3,
      semester: 'Fall 2024',
      type: 'Library Fee',
      amount: 200,
      dueDate: '2024-11-01',
      status: 'pending'
    },
    {
      id: 4,
      semester: 'Fall 2024',
      type: 'Sports Fee',
      amount: 150,
      dueDate: '2024-10-15',
      status: 'overdue'
    }
  ];

  const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = feeRecords
    .filter(r => r.status === 'paid')
    .reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircleIcon className="h-4 w-4" />
            <span>Paid</span>
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
            <ClockIcon className="h-4 w-4" />
            <span>Pending</span>
          </span>
        );
      case 'overdue':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
            <ExclamationCircleIcon className="h-4 w-4" />
            <span>Overdue</span>
          </span>
        );
    }
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
            <CurrencyDollarIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
            <p className="text-sm text-gray-600">Track and manage your fee payments</p>
          </div>
        </div>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Total Fees</span>
            <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">${totalAmount.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mt-1">For current semester</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Paid Amount</span>
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mt-1">
            {Math.round((paidAmount / totalAmount) * 100)}% completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Pending Amount</span>
            <ClockIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-600">${pendingAmount.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mt-1">Due soon</p>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Fee Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feeRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{record.type}</div>
                      <div className="text-sm text-gray-500">{record.semester}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${record.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(record.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4">
                    {record.status === 'paid' ? (
                      <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                        <DocumentArrowDownIcon className="h-5 w-5" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-900 mb-4">Recent Payments</h3>
        <div className="space-y-3">
          {feeRecords
            .filter(r => r.status === 'paid')
            .map((record) => (
              <div
                key={record.id}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{record.type}</h4>
                      <p className="text-sm text-gray-600">
                        Paid on {new Date(record.paidDate!).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Transaction ID: {record.transactionId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${record.amount.toLocaleString()}
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-1">
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-all text-center">
            <div className="text-2xl mb-2">💳</div>
            <div className="font-semibold text-gray-900">Credit/Debit Card</div>
          </button>
          <button className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-all text-center">
            <div className="text-2xl mb-2">🏦</div>
            <div className="font-semibold text-gray-900">Net Banking</div>
          </button>
          <button className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-all text-center">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-semibold text-gray-900">UPI/Wallet</div>
          </button>
        </div>
      </div>
    </div>
  );
}
