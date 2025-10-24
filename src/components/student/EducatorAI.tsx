import { useState } from 'react';
import { 
  AcademicCapIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  CalculatorIcon,
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'essay-helper',
    name: 'Essay Writing Helper',
    description: 'Get help with essay structure, thesis statements, and arguments',
    icon: BookOpenIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'math-solver',
    name: 'Math Problem Solver',
    description: 'Step-by-step solutions for math problems with explanations',
    icon: CalculatorIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'study-planner',
    name: 'Study Plan Generator',
    description: 'Create personalized study schedules based on your goals',
    icon: ClipboardDocumentListIcon,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'concept-explainer',
    name: 'Concept Explainer',
    description: 'Simplify complex topics with easy-to-understand explanations',
    icon: LightBulbIcon,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'lab-assistant',
    name: 'Lab Report Assistant',
    description: 'Help with scientific experiments and lab report writing',
    icon: BeakerIcon,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'quiz-generator',
    name: 'Practice Quiz Generator',
    description: 'Generate custom quizzes to test your knowledge',
    icon: ChartBarIcon,
    color: 'from-red-500 to-pink-500'
  }
];

export default function EducatorAI() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setInput('');
    setOutput('');
  };

  const processInput = async () => {
    if (!input.trim() || !selectedTool) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let result = '';
      
      switch(selectedTool.id) {
        case 'essay-helper':
          result = `📝 Essay Structure for: "${input}"\n\n` +
            `INTRODUCTION:\n` +
            `• Hook: Start with an engaging fact or question about ${input}\n` +
            `• Background: Provide context and define key terms\n` +
            `• Thesis: Your main argument about ${input}\n\n` +
            `BODY PARAGRAPHS (3-5):\n` +
            `• Point 1: First major aspect of ${input}\n` +
            `  - Evidence and examples\n` +
            `  - Analysis and explanation\n` +
            `• Point 2: Second major aspect\n` +
            `  - Supporting details\n` +
            `  - Critical analysis\n` +
            `• Point 3: Third major aspect\n` +
            `  - Examples and data\n` +
            `  - Connect to thesis\n\n` +
            `CONCLUSION:\n` +
            `• Restate thesis in new words\n` +
            `• Summarize main points\n` +
            `• Final thought or call to action\n\n` +
            `💡 Tips:\n` +
            `- Use transition words between paragraphs\n` +
            `- Support claims with evidence\n` +
            `- Maintain formal academic tone`;
          break;
          
        case 'math-solver':
          result = `🔢 Math Solution for: ${input}\n\n` +
            `STEP 1: Identify the problem type\n` +
            `This appears to be an algebraic/calculus problem.\n\n` +
            `STEP 2: Break down the problem\n` +
            `• Identify known variables\n` +
            `• Determine what we need to find\n` +
            `• Choose appropriate formula/method\n\n` +
            `STEP 3: Solve systematically\n` +
            `• Show all work clearly\n` +
            `• Simplify expressions step by step\n` +
            `• Check units and dimensions\n\n` +
            `STEP 4: Verify the answer\n` +
            `• Plug answer back into original equation\n` +
            `• Check if answer makes logical sense\n` +
            `• Consider alternative methods\n\n` +
            `📚 Key Concepts Used:\n` +
            `- Order of operations\n` +
            `- Algebraic manipulation\n` +
            `- Mathematical properties\n\n` +
            `✅ Always remember to:\n` +
            `1. Show your work\n` +
            `2. Label your answer with units\n` +
            `3. Check your solution`;
          break;
          
        case 'study-planner':
          result = `📅 Personalized Study Plan for: ${input}\n\n` +
            `WEEK 1-2: Foundation Building\n` +
            `Monday-Wednesday: 2 hours daily\n` +
            `• Review basic concepts and terminology\n` +
            `• Create comprehensive notes\n` +
            `• Practice simple problems\n\n` +
            `Thursday-Friday: 2 hours daily\n` +
            `• Work on moderate difficulty problems\n` +
            `• Join study groups or discussion forums\n` +
            `• Review and refine notes\n\n` +
            `WEEK 3-4: Deep Practice\n` +
            `Monday-Wednesday: 2.5 hours daily\n` +
            `• Tackle advanced problems\n` +
            `• Take practice tests\n` +
            `• Identify weak areas\n\n` +
            `Thursday-Friday: 2.5 hours daily\n` +
            `• Focus on weak areas\n` +
            `• Review all materials\n` +
            `• Create summary sheets\n\n` +
            `Weekend: Light review (1 hour)\n` +
            `• Recap key concepts\n` +
            `• Relaxation and mental preparation\n\n` +
            `📌 Study Tips:\n` +
            `✓ Use active recall and spaced repetition\n` +
            `✓ Take 10-min breaks every hour\n` +
            `✓ Stay hydrated and well-rested\n` +
            `✓ Teach concepts to others`;
          break;
          
        case 'concept-explainer':
          result = `💡 Simple Explanation of: ${input}\n\n` +
            `WHAT IS IT?\n` +
            `${input} is a concept that can be understood by thinking of it as...\n` +
            `[Simple analogy or comparison to everyday life]\n\n` +
            `WHY IS IT IMPORTANT?\n` +
            `• Real-world applications\n` +
            `• How it connects to other topics\n` +
            `• Why students need to learn it\n\n` +
            `HOW DOES IT WORK?\n` +
            `Step 1: [First fundamental principle]\n` +
            `Step 2: [How components interact]\n` +
            `Step 3: [Final outcome or result]\n\n` +
            `SIMPLE EXAMPLE:\n` +
            `Imagine you're [relatable scenario]...\n` +
            `This is exactly how ${input} works!\n\n` +
            `COMMON MISCONCEPTIONS:\n` +
            `❌ Many think that...\n` +
            `✅ Actually, the correct understanding is...\n\n` +
            `KEY TAKEAWAYS:\n` +
            `1. [Main point 1]\n` +
            `2. [Main point 2]\n` +
            `3. [Main point 3]\n\n` +
            `🎯 Remember: Understanding beats memorization!`;
          break;
          
        case 'lab-assistant':
          result = `🔬 Lab Report Guide for: ${input}\n\n` +
            `TITLE:\n` +
            `"Investigation of ${input}"\n\n` +
            `ABSTRACT (100-200 words):\n` +
            `• Brief overview of experiment\n` +
            `• Main findings\n` +
            `• Significance of results\n\n` +
            `INTRODUCTION:\n` +
            `• Background on ${input}\n` +
            `• Scientific principles involved\n` +
            `• Hypothesis and objectives\n\n` +
            `MATERIALS & METHODS:\n` +
            `• List all equipment used\n` +
            `• Step-by-step procedure\n` +
            `• Safety precautions\n\n` +
            `RESULTS:\n` +
            `• Present data in tables/graphs\n` +
            `• Describe observations\n` +
            `• Include measurements with units\n\n` +
            `DISCUSSION:\n` +
            `• Interpret results\n` +
            `• Compare with expected outcomes\n` +
            `• Explain any anomalies\n` +
            `• Sources of error\n\n` +
            `CONCLUSION:\n` +
            `• Summarize findings\n` +
            `• State if hypothesis was supported\n` +
            `• Suggest improvements\n\n` +
            `📋 Checklist:\n` +
            `□ All data recorded accurately\n` +
            `□ Proper citations included\n` +
            `□ Graphs properly labeled\n` +
            `□ Error analysis included`;
          break;
          
        case 'quiz-generator':
          result = `📝 Practice Quiz on: ${input}\n\n` +
            `MULTIPLE CHOICE (4 questions)\n\n` +
            `Q1. What is the primary characteristic of ${input}?\n` +
            `A) [Option A]\n` +
            `B) [Option B]\n` +
            `C) [Option C]\n` +
            `D) [Option D]\n` +
            `Correct: [Answer with explanation]\n\n` +
            `Q2. Which of the following best describes...?\n` +
            `[Similar format]\n\n` +
            `SHORT ANSWER (3 questions)\n\n` +
            `Q1. Explain the main concept of ${input} in your own words.\n` +
            `Model Answer: [Detailed explanation]\n\n` +
            `Q2. Describe the relationship between ${input} and...\n` +
            `Model Answer: [Explanation]\n\n` +
            `PROBLEM SOLVING (2 questions)\n\n` +
            `Q1. Apply ${input} to solve: [Practical problem]\n` +
            `Solution: [Step-by-step solution]\n\n` +
            `Q2. Challenge Problem: [Complex application]\n` +
            `Solution: [Detailed solution]\n\n` +
            `📊 SCORING GUIDE:\n` +
            `MC: 2 points each\n` +
            `Short Answer: 5 points each\n` +
            `Problem Solving: 10 points each\n` +
            `Total: 43 points\n\n` +
            `💪 Study Tips:\n` +
            `• Review areas where you struggled\n` +
            `• Try explaining answers to others\n` +
            `• Create your own practice questions`;
          break;
      }
      
      setOutput(result);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
          <AcademicCapIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Educator AI Tools</h2>
          <p className="text-sm text-gray-600">Smart tools to enhance your learning</p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool)}
            className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
              selectedTool?.id === tool.id
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-indigo-300'
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.color} mb-3`}>
              <tool.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </button>
        ))}
      </div>

      {/* Input Section */}
      {selectedTool && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 animate-slide-up">
          <div className="flex items-center space-x-2 mb-4">
            <selectedTool.icon className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">{selectedTool.name}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your topic or question:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`e.g., ${
                  selectedTool.id === 'essay-helper' ? 'Climate Change Impact' :
                  selectedTool.id === 'math-solver' ? 'Solve: 2x + 5 = 15' :
                  selectedTool.id === 'study-planner' ? 'Final Exams in 4 weeks' :
                  selectedTool.id === 'concept-explainer' ? 'Photosynthesis' :
                  selectedTool.id === 'lab-assistant' ? 'Chemical Reactions Lab' :
                  'Newton\'s Laws of Motion'
                }`}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={processInput}
              disabled={!input.trim() || isProcessing}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <SparklesIcon className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  <span>Generate with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          {output && (
            <div className="mt-6 bg-white rounded-lg p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-900">Result:</h4>
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Copy to Clipboard
                </button>
              </div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {output}
              </pre>
            </div>
          )}
        </div>
      )}

      {!selectedTool && (
        <div className="text-center py-8 text-gray-500">
          <AcademicCapIcon className="h-16 w-16 mx-auto mb-3 text-gray-300" />
          <p>Select a tool above to get started</p>
        </div>
      )}
    </div>
  );
}
