
import React, { useState } from 'react';

const steps = [
  { id: 1, title: 'Reception', description: 'Request Arrives', details: 'The gateway listens on a public port (usually 80/443) and receives the incoming HTTP/gRPC request from the client.' },
  { id: 2, title: 'Validation', description: 'Structure Check', details: 'The gateway ensures the request is well-formed, contains required headers, and matches the expected JSON/XML schema.' },
  { id: 3, title: 'Auth', description: 'Identity Verification', details: 'The gateway validates tokens (e.g., JWT, OAuth2) or API Keys. It ensures the user has permission to access the resource.' },
  { id: 4, title: 'Rate Limit', description: 'Traffic Control', details: 'Checks if the user has exceeded their quota. If so, it returns a 429 status code immediately without hitting backends.' },
  { id: 5, title: 'Transform (Req)', description: 'Preprocessing', details: 'The gateway might strip internal headers, add correlation IDs for logging, or change the request path.' },
  { id: 6, title: 'Routing', description: 'Upstream Delivery', details: 'Service discovery finds the private IP/Port of the target service. The gateway proxies the request to the backend.' },
  { id: 7, title: 'Transform (Res)', description: 'Postprocessing', details: 'The backend response is received. The gateway may mask sensitive internal data or add security headers like CORS.' },
  { id: 8, title: 'Response', description: 'Final Delivery', details: 'The finalized response is sent back to the original client. The lifecycle of this request is complete.' },
];

const LifecycleTab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : 0));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : steps.length - 1));

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="p-6 md:p-10 space-y-12 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">The Request Journey Wizard</h2>
        <p className="text-slate-400">See what happens to a request inside the Gateway pipeline.</p>
      </div>

      {/* Progress Line */}
      <div className="relative pt-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-cyan-500 -translate-y-1/2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style={{ width: `${progress}%` }}
        ></div>

        <div className="flex justify-between relative">
          {steps.map((step, idx) => (
            <button 
              key={step.id}
              onClick={() => setCurrentStep(idx)}
              className={`group flex flex-col items-center gap-4 transition-all duration-300 relative z-10 ${idx <= currentStep ? 'text-cyan-400' : 'text-slate-600'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 ${
                idx === currentStep ? 'bg-cyan-500 border-cyan-400 text-slate-950 scale-125 shadow-lg' :
                idx < currentStep ? 'bg-slate-800 border-cyan-600 text-cyan-400' : 'bg-slate-900 border-slate-700'
              }`}>
                {step.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter absolute -bottom-8 whitespace-nowrap hidden md:block ${idx === currentStep ? 'opacity-100' : 'opacity-40'}`}>
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Moving Packet Animation */}
        <div 
          className="absolute top-1/2 -mt-10 transition-all duration-500"
          style={{ left: `${((currentStep) / (steps.length - 1)) * 95}%` }}
        >
          <div className="w-8 h-8 bg-white/10 rounded border border-white/20 flex items-center justify-center animate-bounce shadow-xl backdrop-blur-sm">
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-20 bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-2xl animate-fade-in transition-all">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="bg-cyan-500/10 text-cyan-400 px-6 py-4 rounded-xl border border-cyan-500/20 w-full md:w-auto text-center">
            <span className="block text-4xl font-bold mb-1">Step {steps[currentStep].id}</span>
            <span className="text-xs uppercase font-bold tracking-widest opacity-60">Status: Active</span>
          </div>
          <div className="flex-1 space-y-4">
            <div>
               <h3 className="text-2xl font-bold text-white mb-2">{steps[currentStep].description}</h3>
               <p className="text-lg text-slate-300 leading-relaxed">{steps[currentStep].details}</p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={prevStep}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-bold transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg text-sm font-bold transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Restart Journey' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifecycleTab;
