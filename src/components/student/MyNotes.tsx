import { useState } from 'react';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface Note {
  id: number;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function MyNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Calculus - Derivatives',
      content: 'Key formulas:\n- Power rule: d/dx(x^n) = nx^(n-1)\n- Product rule: (uv)\' = u\'v + uv\'\n- Chain rule: d/dx[f(g(x))] = f\'(g(x))g\'(x)',
      subject: 'Mathematics',
      tags: ['calculus', 'derivatives', 'formulas'],
      isPinned: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 2,
      title: 'Python - Data Structures',
      content: 'Important data structures:\n- Lists: Ordered, mutable collections\n- Tuples: Ordered, immutable\n- Sets: Unordered, unique elements\n- Dictionaries: Key-value pairs',
      subject: 'Programming',
      tags: ['python', 'data-structures', 'coding'],
      isPinned: false,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    subject: '',
    tags: ''
  });

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note: Note = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject || 'General',
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', subject: '', tags: '' });
    setIsCreating(false);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleTogglePin = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl">
            <PencilSquareIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
            <p className="text-sm text-gray-600">Organize your study notes</p>
          </div>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title, content, subject, or tags..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Create Note Form */}
      {isCreating && (
        <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 animate-slide-up">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Note</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="Note Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              value={newNote.subject}
              onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
              placeholder="Subject (e.g., Mathematics, Physics)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              placeholder="Write your notes here..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <input
              type="text"
              value={newNote.tags}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              placeholder="Tags (comma separated)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleCreateNote}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Note
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-white text-gray-600 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center">
            <BookmarkSolidIcon className="h-4 w-4 mr-2 text-yellow-500" />
            Pinned Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      {unpinnedNotes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">All Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        </div>
      )}

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <PencilSquareIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No notes found matching your search' : 'No notes yet. Create your first note!'}
          </p>
        </div>
      )}
    </div>
  );
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
}

function NoteCard({ note, onDelete, onTogglePin }: NoteCardProps) {
  const subjectColors: Record<string, string> = {
    'Mathematics': 'bg-purple-100 text-purple-800',
    'Programming': 'bg-green-100 text-green-800',
    'Physics': 'bg-blue-100 text-blue-800',
    'Chemistry': 'bg-orange-100 text-orange-800',
    'General': 'bg-gray-100 text-gray-800'
  };

  const colorClass = subjectColors[note.subject] || subjectColors['General'];

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all p-4 hover:shadow-lg group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{note.title}</h4>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            {note.subject}
          </span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onTogglePin(note.id)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            {note.isPinned ? (
              <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <BookmarkIcon className="h-5 w-5 text-gray-400 group-hover:text-yellow-500" />
            )}
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3 whitespace-pre-line">
        {note.content}
      </p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="text-xs text-gray-400 pt-2 border-t">
        Updated {note.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
}
