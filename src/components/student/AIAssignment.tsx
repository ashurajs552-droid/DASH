import { useState } from 'react';
import { 
  SparklesIcon, 
  DocumentTextIcon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Assignment {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  topics: string[];
}

export default function AIAssignment() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [generatedAssignment, setGeneratedAssignment] = useState<Assignment | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAssignment = () => {
    if (!subject || !topic) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const assignments: Record<string, Assignment> = {
        'Math': {
          id: 1,
          title: `${difficulty} Level ${topic} Problems`,
          description: `Complete the following ${topic} problems to reinforce your understanding:\n\n1. Solve for x: 2x + 5 = 15\n2. Find the derivative of f(x) = 3x² + 2x - 1\n3. Calculate the area under the curve y = x² from x=0 to x=3\n4. Prove the Pythagorean theorem using geometric methods\n5. Solve the system of equations: 2x + y = 7 and x - y = 1\n\nShow all your work and explain your reasoning for each problem.`,
          difficulty,
          estimatedTime: difficulty === 'Easy' ? '30 mins' : difficulty === 'Medium' ? '1 hour' : '2 hours',
          topics: [topic, 'Problem Solving', 'Mathematical Reasoning']
        },
        'Science': {
          id: 2,
          title: `${topic} Research Assignment`,
          description: `Explore the following aspects of ${topic}:\n\n1. Define the key concepts and principles\n2. Explain real-world applications and examples\n3. Discuss recent discoveries or developments\n4. Create a visual representation (diagram/flowchart)\n5. Propose an experiment to demonstrate the concept\n\nInclude citations and references from at least 3 reliable sources.`,
          difficulty,
          estimatedTime: difficulty === 'Easy' ? '45 mins' : difficulty === 'Medium' ? '1.5 hours' : '3 hours',
          topics: [topic, 'Research', 'Scientific Method']
        },
        'Programming': {
          id: 3,
          title: `${topic} Coding Challenge`,
          description: `Build a project that demonstrates ${topic}:\n\n1. Create a simple application using the concept\n2. Implement error handling and input validation\n3. Write clean, well-documented code\n4. Add unit tests for your functions\n5. Deploy and share your project (GitHub/Portfolio)\n\nBonus: Add a README explaining your design decisions.`,
          difficulty,
          estimatedTime: difficulty === 'Easy' ? '1 hour' : difficulty === 'Medium' ? '2 hours' : '4 hours',
          topics: [topic, 'Coding', 'Best Practices']
        },
        'default': {
          id: 4,
          title: `${topic} Comprehensive Study Assignment`,
          description: `Deep dive into ${topic}:\n\n1. Research and summarize the main concepts\n2. Create detailed notes with examples\n3. List 5 key takeaways\n4. Generate 10 practice questions with answers\n5. Create a mind map or concept diagram\n6. Write a 500-word essay explaining the importance\n\nUse multiple sources and cite them properly.`,
          difficulty,
          estimatedTime: difficulty === 'Easy' ? '1 hour' : difficulty === 'Medium' ? '2 hours' : '3 hours',
          topics: [topic, 'Research', 'Writing']
        }
      };

      const assignmentKey = Object.keys(assignments).find(key => 
        subject.toLowerCase().includes(key.toLowerCase())
      ) || 'default';

      setGeneratedAssignment(assignments[assignmentKey]);
      setIsGenerating(false);
    }, 2000);
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl">
          <SparklesIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Assignment Generator</h2>
          <p className="text-sm text-gray-600">Create personalized practice assignments</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Mathematics, Physics, Programming"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Calculus, Quantum Mechanics, Data Structures"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <div className="flex space-x-3">
            {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                  difficulty === level
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateAssignment}
          disabled={!subject || !topic || isGenerating}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
              <span>Generating Assignment...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              <span>Generate Assignment</span>
            </>
          )}
        </button>
      </div>

      {generatedAssignment && (
        <div className="mt-6 border-t pt-6 animate-slide-up">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{generatedAssignment.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(generatedAssignment.difficulty)}`}>
                      {generatedAssignment.difficulty}
                    </span>
                    <span className="text-sm text-gray-600">⏱ {generatedAssignment.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-gray-900">Assignment Details</h4>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{generatedAssignment.description}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <LightBulbIcon className="h-5 w-5 text-indigo-600" />
                <h4 className="font-semibold text-gray-900">Topics Covered</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {generatedAssignment.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Save Assignment
              </button>
              <button className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
