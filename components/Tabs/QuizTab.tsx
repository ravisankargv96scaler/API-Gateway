
import React, { useState } from 'react';

const QuizTab: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "What is the primary architectural role of an API Gateway?",
      options: [
        "To act as a central database for all microservices",
        "To provide a single, unified entry point for clients",
        "To replace the need for frontend development",
        "To handle the physical hardware of servers"
      ],
      a: "To provide a single, unified entry point for clients"
    },
    {
      q: "Which Gateway feature is specifically designed to prevent resource abuse?",
      options: [
        "Request Transformation",
        "Protocal Translation",
        "Rate Limiting",
        "Service Discovery"
      ],
      a: "Rate Limiting"
    },
    {
      q: "Where does the API Gateway sit in relation to backend services?",
      options: [
        "Before backend services (facing the client)",
        "Inside each microservice container",
        "After the database layer",
        "It only exists on the developer's machine"
      ],
      a: "Before backend services (facing the client)"
    }
  ];

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].a) {
      setScore(s => s + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Summary & Checkpoint</h2>
        <p className="text-slate-400">Recap your knowledge of System Design's most critical entry pattern.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700">
           <h3 className="font-bold text-cyan-400 mb-4 uppercase tracking-widest text-sm">Main Benefits</h3>
           <ul className="space-y-3">
             <li className="flex items-start gap-2">
               <span className="text-green-500 mt-1">✓</span>
               <span className="text-slate-300">Simplified clients (Single URL)</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="text-green-500 mt-1">✓</span>
               <span className="text-slate-300">Centralized Cross-Cutting Concerns (Auth, Logging)</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="text-green-500 mt-1">✓</span>
               <span className="text-slate-300">Backend Agility (Services can change ports/IPs)</span>
             </li>
           </ul>
        </div>
        <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700">
           <h3 className="font-bold text-red-400 mb-4 uppercase tracking-widest text-sm">Potential Trade-offs</h3>
           <ul className="space-y-3">
             <li className="flex items-start gap-2">
               <span className="text-red-500 mt-1">!</span>
               <span className="text-slate-300">Single point of failure (if not HA)</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="text-red-500 mt-1">!</span>
               <span className="text-slate-300">Added latency (extra network hop)</span>
             </li>
             <li className="flex items-start gap-2">
               <span className="text-red-500 mt-1">!</span>
               <span className="text-slate-300">Complexity in Gateway configuration</span>
             </li>
           </ul>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {showResult ? (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎓</div>
            <h3 className="text-3xl font-bold">Quiz Complete!</h3>
            <p className="text-xl">Your Score: <span className="text-cyan-400 font-bold">{score} / {questions.length}</span></p>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
               <div className="bg-cyan-500 h-full" style={{ width: `${(score/questions.length)*100}%` }}></div>
            </div>
            <button 
              onClick={restart}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl transition-all"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
               <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
               <span className="text-slate-500 text-sm">Current Score: {score}</span>
            </div>
            <h3 className="text-2xl font-bold leading-tight">{questions[currentQuestion].q}</h3>
            
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedOption === opt
                      ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOption === opt ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                  }`}>
                    {selectedOption === opt && <div className="w-2 h-2 bg-slate-950 rounded-full"></div>}
                  </div>
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button 
                disabled={!selectedOption}
                onClick={handleNext}
                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedOption 
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-lg' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTab;
