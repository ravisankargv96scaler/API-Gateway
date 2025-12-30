
import React, { useState } from 'react';
import { TabType } from './types';
import WhyTab from './components/Tabs/WhyTab';
import FeaturesTab from './components/Tabs/FeaturesTab';
import LifecycleTab from './components/Tabs/LifecycleTab';
import RealWorldTab from './components/Tabs/RealWorldTab';
import CodeTab from './components/Tabs/CodeTab';
import QuizTab from './components/Tabs/QuizTab';
import AITutor from './components/AITutor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.WHY);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.WHY: return <WhyTab />;
      case TabType.FEATURES: return <FeaturesTab />;
      case TabType.LIFECYCLE: return <LifecycleTab />;
      case TabType.REAL_WORLD: return <RealWorldTab />;
      case TabType.CODE: return <CodeTab />;
      case TabType.SUMMARY: return <QuizTab />;
      default: return <WhyTab />;
    }
  };

  const tabs = [
    { id: TabType.WHY, label: 'The Problem' },
    { id: TabType.FEATURES, label: 'Core Features' },
    { id: TabType.LIFECYCLE, label: 'How It Works' },
    { id: TabType.REAL_WORLD, label: 'Real World' },
    { id: TabType.CODE, label: 'Code' },
    { id: TabType.SUMMARY, label: 'Summary & Quiz' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              API Gateway Masterclass
            </h1>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
          {renderTabContent()}
        </div>
      </main>

      <AITutor />

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-900">
        <p>&copy; 2024 System Design Academy • Built for Modern Engineers</p>
      </footer>
    </div>
  );
};

export default App;
