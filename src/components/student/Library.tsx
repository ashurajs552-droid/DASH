import { useState } from 'react';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'borrowed' | 'overdue';
  dueDate?: string;
  coverColor: string;
}

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const borrowedBooks: Book[] = [
    {
      id: 1,
      title: 'Advanced Calculus',
      author: 'Dr. James Stewart',
      isbn: '978-0-321-71741-0',
      category: 'Mathematics',
      status: 'borrowed',
      dueDate: '2024-11-15',
      coverColor: 'from-purple-500 to-indigo-500'
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0-262-03384-8',
      category: 'Computer Science',
      status: 'overdue',
      dueDate: '2024-10-20',
      coverColor: 'from-red-500 to-orange-500'
    }
  ];

  const availableBooks: Book[] = [
    {
      id: 3,
      title: 'Quantum Physics',
      author: 'Richard Feynman',
      isbn: '978-0-201-02115-8',
      category: 'Physics',
      status: 'available',
      coverColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      title: 'Organic Chemistry',
      author: 'Paula Bruice',
      isbn: '978-0-321-80322-1',
      category: 'Chemistry',
      status: 'available',
      coverColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      author: 'Andrew Ng',
      isbn: '978-0-262-01889-0',
      category: 'Computer Science',
      status: 'available',
      coverColor: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      title: 'Linear Algebra',
      author: 'Gilbert Strang',
      isbn: '978-0-980-23277-8',
      category: 'Mathematics',
      status: 'available',
      coverColor: 'from-pink-500 to-rose-500'
    }
  ];

  const categories = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science'];

  const filteredBooks = [...borrowedBooks, ...availableBooks].filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, dueDate?: string) => {
    switch(status) {
      case 'available':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircleIcon className="h-4 w-4" />
            <span>Available</span>
          </span>
        );
      case 'borrowed':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            <ClockIcon className="h-4 w-4" />
            <span>Due: {dueDate}</span>
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
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
            <BookOpenIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Library Management</h2>
            <p className="text-sm text-gray-600">Browse and manage your books</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books by title or author..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* My Borrowed Books */}
      {borrowedBooks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">My Borrowed Books</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-indigo-300 transition-all hover:shadow-lg"
              >
                <div className="flex space-x-4">
                  <div className={`w-20 h-28 bg-gradient-to-br ${book.coverColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <BookOpenIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-xs text-gray-500 mb-2">ISBN: {book.isbn}</p>
                    {getStatusBadge(book.status, book.dueDate)}
                    <div className="mt-3 flex space-x-2">
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        Renew
                      </button>
                      <button className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
                        Return
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Books */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Available Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 book.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
            return matchesSearch && matchesCategory;
          }).map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-indigo-300 transition-all hover:shadow-lg"
            >
              <div className={`w-full h-40 bg-gradient-to-br ${book.coverColor} rounded-lg flex items-center justify-center mb-4`}>
                <BookOpenIcon className="h-16 w-16 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{book.title}</h4>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-3">
                {book.category}
              </span>
              <p className="text-xs text-gray-500 mb-3">ISBN: {book.isbn}</p>
              {getStatusBadge(book.status)}
              <button className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all">
                Borrow Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Library Stats */}
      <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <h3 className="font-bold text-gray-900 mb-3">Library Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{borrowedBooks.length}</div>
            <div className="text-gray-600">Books Borrowed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{availableBooks.length}</div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {borrowedBooks.filter(b => b.status === 'overdue').length}
            </div>
            <div className="text-gray-600">Overdue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
