
import React, { useState, useEffect } from 'react';

const RealWorldTab: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'auth' | 'restaurant' | 'payment' | 'complete'>('idle');
  const [loading, setLoading] = useState(false);

  const startOrder = async () => {
    setLoading(true);
    setPhase('auth');
    await new Promise(r => setTimeout(r, 1500));
    setPhase('restaurant');
    await new Promise(r => setTimeout(r, 1500));
    setPhase('payment');
    await new Promise(r => setTimeout(r, 1500));
    setPhase('complete');
    setLoading(false);
  };

  const reset = () => {
    setPhase('idle');
  };

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Food Delivery Simulation</h2>
        <p className="text-slate-400">Watch the Gateway orchestrate multiple backend services for one client request.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {/* Mobile Mockup */}
        <div className="flex justify-center">
           <div className="w-[280px] h-[560px] bg-slate-800 border-[8px] border-slate-900 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
              <div className="w-1/3 h-6 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>
              
              <div className="flex-1 p-6 flex flex-col gap-6 pt-12 bg-slate-900">
                <div className="h-40 bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/400/300?random=1" alt="food" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute text-center">
                    <h4 className="text-xl font-bold text-white">Deluxe Pizza</h4>
                    <p className="text-xs text-slate-400">$18.99</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-xl space-y-2">
                    <p className="text-xs text-slate-500">Delivery Address</p>
                    <p className="text-sm font-semibold">123 Tech Lane, San Francisco</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl space-y-2">
                    <p className="text-xs text-slate-500">Payment Method</p>
                    <p className="text-sm font-semibold">Visa ending in •••• 4242</p>
                  </div>
                </div>

                <div className="mt-auto">
                   {phase === 'complete' ? (
                     <div className="text-center space-y-4 py-4 animate-bounce">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-500/30">
                          <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-green-400 font-bold text-xl">Order Confirmed!</p>
                        <button onClick={reset} className="text-xs text-slate-500 underline">Order Again</button>
                     </div>
                   ) : (
                    <button 
                      disabled={loading}
                      onClick={startOrder}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${
                        loading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-slate-950 shadow-lg shadow-orange-500/20'
                      }`}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                   )}
                </div>
              </div>
           </div>
        </div>

        {/* Animation Flow */}
        <div className="hidden lg:flex flex-col gap-12 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800 -translate-x-1/2 -z-10"></div>
          
          <div className={`p-4 rounded-xl border transition-all duration-500 ${phase === 'auth' ? 'bg-cyan-500/20 border-cyan-500 translate-x-4 scale-105' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-cyan-500 flex items-center justify-center font-bold text-slate-900">1</div>
              <div>
                <h5 className="font-bold">Auth Service</h5>
                <p className="text-xs text-slate-500">POST /v1/auth/verify</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-500 ${phase === 'restaurant' ? 'bg-indigo-500/20 border-indigo-500 translate-x-4 scale-105' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-indigo-500 flex items-center justify-center font-bold text-slate-900">2</div>
              <div>
                <h5 className="font-bold">Restaurant Service</h5>
                <p className="text-xs text-slate-500">GET /inventory/pizza-01</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border transition-all duration-500 ${phase === 'payment' ? 'bg-green-500/20 border-green-500 translate-x-4 scale-105' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-green-500 flex items-center justify-center font-bold text-slate-900">3</div>
              <div>
                <h5 className="font-bold">Payment Service</h5>
                <p className="text-xs text-slate-500">POST /transactions/charge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6">
          <h3 className="text-xl font-bold border-b border-slate-700 pb-4">Internal Workflow</h3>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex gap-2">
              <span className="text-orange-400">Client:</span>
              <span className="text-slate-300">POST /orders</span>
            </div>
            <div className="pl-4 border-l-2 border-slate-700 space-y-4">
              <div className={`transition-opacity ${phase === 'auth' ? 'opacity-100 text-cyan-400' : 'opacity-30'}`}>
                {'>'} Calling Auth service...<br/>
                {'<'} User #1029 verified
              </div>
              <div className={`transition-opacity ${phase === 'restaurant' ? 'opacity-100 text-indigo-400' : 'opacity-30'}`}>
                {'>'} Checking availability...<br/>
                {'<'} Pizza in stock!
              </div>
              <div className={`transition-opacity ${phase === 'payment' ? 'opacity-100 text-green-400' : 'opacity-30'}`}>
                {'>'} Processing payment...<br/>
                {'<'} Stripe: Approved ($18.99)
              </div>
            </div>
            <div className={`transition-opacity ${phase === 'complete' ? 'opacity-100 text-cyan-400' : 'opacity-30'}`}>
               <span className="text-orange-400">Gateway:</span> 201 Created (Order Confirmed)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealWorldTab;
