
import React, { useState } from 'react';

const WhyTab: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">The Problem: Chaos & Complexity</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          In a microservice architecture, managing direct connections between multiple clients and services creates a fragile, tangled mess.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Without Gateway */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-slate-800/50 rounded-xl p-8 flex-1 relative min-h-[400px]">
            <h3 className="text-red-400 font-semibold mb-8 text-center uppercase tracking-wider">Without Gateway: Chaos</h3>
            
            <div className="flex justify-between items-center h-full gap-8">
              {/* Clients */}
              <div className="flex flex-col gap-8">
                {['Mobile', 'Web', 'Desktop'].map(c => (
                  <div key={c} className="w-16 h-16 bg-slate-700 rounded-lg flex flex-col items-center justify-center text-[10px] text-slate-300 border border-slate-600">
                    <div className="w-6 h-6 mb-1 text-slate-400">
                       <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>
                    </div>
                    {c}
                  </div>
                ))}
              </div>

              {/* Chaos Lines */}
              <div className="flex-1 relative h-64 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
                    </marker>
                  </defs>
                  {/* Static Lines */}
                  {[20, 50, 80].map(y1 => [20, 50, 80].map(y2 => (
                    <line key={`${y1}-${y2}`} x1="0" y1={y1} x2="100" y2={y2} stroke="#475569" strokeWidth="0.5" opacity="0.3" />
                  )))}

                  {/* Animated Dots */}
                  {isSimulating && (
                    <>
                      {[...Array(9)].map((_, i) => {
                        const yStart = [20, 50, 80][i % 3];
                        const yEnd = [20, 50, 80][Math.floor(i / 3)];
                        return (
                          <circle key={i} r="2" fill="#ef4444" className="animate-pulse">
                            <animateMotion 
                              path={`M 0 ${yStart} L 100 ${yEnd}`} 
                              dur={`${1 + Math.random() * 2}s`} 
                              repeatCount="indefinite" 
                            />
                          </circle>
                        );
                      })}
                    </>
                  )}
                </svg>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-8">
                {['Auth', 'Payment', 'Order'].map(s => (
                  <div key={s} className="w-16 h-12 bg-slate-900 border border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    {s}:808{s.length}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm italic text-center">
            Clients must know every endpoint, port, and security detail for every service.
          </p>
        </div>

        {/* Right Side: With Gateway */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-8 flex-1 relative min-h-[400px]">
            <h3 className="text-cyan-400 font-semibold mb-8 text-center uppercase tracking-wider">With Gateway: Unified</h3>

            <div className="flex justify-between items-center h-full gap-4">
              {/* Clients */}
              <div className="flex flex-col gap-8">
                {['Mobile', 'Web', 'Desktop'].map(c => (
                  <div key={c} className="w-16 h-16 bg-slate-700 rounded-lg flex flex-col items-center justify-center text-[10px] text-slate-300 border border-slate-600">
                    <div className="w-6 h-6 mb-1 text-slate-400">
                       <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>
                    </div>
                    {c}
                  </div>
                ))}
              </div>

              {/* Input Lines */}
              <div className="flex-1 relative h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="100" y2="50" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="80" x2="100" y2="50" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  
                  {isSimulating && (
                    <>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 20 L 100 50" dur="1s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 50 L 100 50" dur="0.8s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 80 L 100 50" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </svg>
              </div>

              {/* API Gateway Box */}
              <div className="z-10 bg-cyan-500 rounded-lg p-3 text-slate-950 font-bold text-center w-24 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                API<br/>GATEWAY
              </div>

              {/* Output Lines */}
              <div className="flex-1 relative h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="100" y2="20" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="50" x2="100" y2="80" stroke="#0891b2" strokeWidth="1" opacity="0.3" />
                  
                  {isSimulating && (
                    <>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 50 L 100 20" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 50 L 100 50" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle r="2" fill="#22d3ee">
                        <animateMotion path="M 0 50 L 100 80" dur="1s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </svg>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-8">
                 {['Auth', 'Payment', 'Order'].map(s => (
                  <div key={s} className="w-16 h-12 bg-slate-900 border border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    {s} Svc
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-sm italic text-center">
            The Gateway abstracts service complexity and provides a single public URL.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={toggleSimulation}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
            isSimulating 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
              : 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
          }`}
        >
          {isSimulating ? 'Stop Traffic' : 'Simulate Traffic'}
        </button>
      </div>
    </div>
  );
};

export default WhyTab;
