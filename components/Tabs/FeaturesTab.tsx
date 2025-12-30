
import React, { useState, useEffect } from 'react';

const FeaturesTab: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('Rate Limiting');
  
  // Rate Limiting State
  const [reqCount, setReqCount] = useState(0);
  const [reqHistory, setReqHistory] = useState<{ id: number; status: 'ok' | 'fail' }[]>([]);

  // Auth State
  const [token, setToken] = useState('');
  const [authStatus, setAuthStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');

  // Caching State
  const [isCached, setIsCached] = useState(false);
  const [cacheLoading, setCacheLoading] = useState(false);
  const [lastLatency, setLastLatency] = useState<number | null>(null);

  // Circuit Breaker State
  const [serviceHealthy, setServiceHealthy] = useState(true);
  const [cbState, setCbState] = useState<'CLOSED' | 'OPEN' | 'HALF-OPEN'>('CLOSED');
  const [failureCount, setFailureCount] = useState(0);

  const features = [
    { id: 'Auth', name: 'Auth & Security', icon: '🔐', desc: 'Centralized authentication and authorization. Validate JWTs or API keys once.' },
    { id: 'Rate Limiting', name: 'Rate Limiting', icon: '⏳', desc: 'Prevent abuse by limiting requests per IP or user. Protect upstream services.' },
    { id: 'Caching', name: 'Caching', icon: '⚡', desc: 'Store frequent responses at the edge to reduce backend load and latency.' },
    { id: 'Transformation', name: 'Request Transformation', icon: '🔄', desc: 'Modify headers, paths, or query params before forwarding the request.' },
    { id: 'Circuit Breaker', name: 'Circuit Breaker', icon: '🔌', desc: 'Stop sending traffic to unhealthy services to prevent cascading failures.' },
  ];

  // --- Rate Limiting Logic ---
  const handleRateLimitRequest = () => {
    const newId = Date.now();
    if (reqCount < 5) {
      setReqCount(prev => prev + 1);
      // Fix: Use 'as const' to ensure the status property is typed as 'ok' | 'fail' rather than string
      setReqHistory(prev => [{ id: newId, status: 'ok' as const }, ...prev].slice(0, 5));
    } else {
      // Fix: Use 'as const' to ensure the status property is typed as 'ok' | 'fail' rather than string
      setReqHistory(prev => [{ id: newId, status: 'fail' as const }, ...prev].slice(0, 5));
    }
  };

  // --- Auth Logic ---
  const handleAuthValidate = async () => {
    setAuthStatus('validating');
    await new Promise(r => setTimeout(r, 1000));
    if (token.toLowerCase() === 'secret-token-123') {
      setAuthStatus('success');
    } else {
      setAuthStatus('error');
    }
  };

  // --- Caching Logic ---
  const handleCacheRequest = async () => {
    setCacheLoading(true);
    const start = performance.now();
    const delay = isCached ? 50 : 2000;
    await new Promise(r => setTimeout(r, delay));
    const end = performance.now();
    setLastLatency(Math.round(end - start));
    setCacheLoading(false);
    setIsCached(true);
  };

  // --- Circuit Breaker Logic ---
  const handleCbRequest = () => {
    if (cbState === 'OPEN') return;

    if (!serviceHealthy) {
      setFailureCount(f => {
        const next = f + 1;
        if (next >= 3) setCbState('OPEN');
        return next;
      });
    } else {
      setFailureCount(0);
      setCbState('CLOSED');
    }
  };

  useEffect(() => {
    if (cbState === 'OPEN') {
      const timer = setTimeout(() => {
        setCbState('HALF-OPEN');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [cbState]);

  return (
    <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-10">
      {/* Feature Rack */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold mb-6">Interactive Feature Rack</h2>
        <div className="bg-slate-800 border-4 border-slate-700 rounded-lg p-4 space-y-3 shadow-inner">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFeature(f.id)}
              className={`w-full text-left p-4 rounded border transition-all flex items-center gap-4 ${
                selectedFeature === f.id
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                  : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="font-semibold flex-1">{f.name}</span>
              <div className={`w-3 h-3 rounded-full ${selectedFeature === f.id ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Panel */}
      <div className="lg:w-1/2 flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex-1 flex flex-col gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-cyan-500 tracking-widest">Active Module</span>
            <h3 className="text-2xl font-bold">{selectedFeature}</h3>
            <p className="text-slate-400">{features.find(f => f.id === selectedFeature)?.desc}</p>
          </div>

          <hr className="border-slate-800" />

          <div className="flex-1">
            {selectedFeature === 'Rate Limiting' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-500 font-bold uppercase">Quota: 5 Reqs / Window</p>
                  <p className="text-2xl font-mono text-cyan-400">{reqCount}/5</p>
                </div>
                <button onClick={handleRateLimitRequest} className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-lg transition-transform active:scale-95">
                  Send API Request
                </button>
                <div className="space-y-2">
                  {reqHistory.map(req => (
                    <div key={req.id} className={`p-2 rounded text-xs flex justify-between ${req.status === 'ok' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      <span>GET /api/resource</span>
                      <span className="font-bold">{req.status === 'ok' ? '200 OK' : '429 TOO MANY'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFeature === 'Auth' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 uppercase font-bold">Bearer Token</label>
                  <input 
                    type="text" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter secret-token-123"
                    className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-cyan-400 focus:outline-none"
                  />
                </div>
                <button onClick={handleAuthValidate} className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg">
                  {authStatus === 'validating' ? 'Checking JWT...' : 'Validate & Forward'}
                </button>
                {authStatus !== 'idle' && (
                  <div className={`p-4 rounded-lg text-center font-bold ${authStatus === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {authStatus === 'success' ? 'Authorized: Routing to backend...' : '401 Unauthorized: Access Denied'}
                  </div>
                )}
              </div>
            )}

            {selectedFeature === 'Caching' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-800 p-4 rounded-lg">
                  <span className="text-sm">Cache Status: <span className={isCached ? 'text-green-400 font-bold' : 'text-slate-500'}>{isCached ? 'HIT' : 'MISS'}</span></span>
                  <button onClick={() => setIsCached(false)} className="text-xs text-slate-500 underline">Purge Cache</button>
                </div>
                <button 
                  onClick={handleCacheRequest} 
                  disabled={cacheLoading}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold rounded-lg transition-transform active:scale-95 disabled:opacity-50"
                >
                  {cacheLoading ? 'Fetching from Backend...' : 'Request Expensive Data'}
                </button>
                {lastLatency !== null && (
                  <div className="text-center animate-pulse">
                    <p className="text-slate-400">Response Time</p>
                    <p className={`text-4xl font-mono ${lastLatency < 100 ? 'text-green-400' : 'text-yellow-400'}`}>{lastLatency}ms</p>
                  </div>
                )}
              </div>
            )}

            {selectedFeature === 'Transformation' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-2">
                    <p className="text-slate-500 uppercase font-bold">Incoming (Public)</p>
                    <div className="bg-slate-800 p-3 rounded border border-slate-700 h-24 overflow-auto">
                      Host: api.myapp.com<br/>
                      User-Agent: iPhone<br/>
                      X-Forwarded: null
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-cyan-500 uppercase font-bold">Outgoing (Internal)</p>
                    <div className="bg-cyan-900/20 p-3 rounded border border-cyan-500/30 h-24 overflow-auto">
                      Host: user-svc:8080<br/>
                      X-Correlation-ID: 8821a<br/>
                      X-Auth-User: #ID102
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg text-sm text-slate-400">
                  <p>Gateways often transform requests to hide internal architecture or inject context (like User IDs) extracted from tokens.</p>
                </div>
              </div>
            )}

            {selectedFeature === 'Circuit Breaker' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Backend Health</span>
                  <button 
                    onClick={() => setServiceHealthy(!serviceHealthy)} 
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${serviceHealthy ? 'bg-green-500 text-slate-900' : 'bg-red-500 text-white'}`}
                  >
                    {serviceHealthy ? 'HEALHTY' : 'DOWN'}
                  </button>
                </div>
                <div className="flex justify-center py-4">
                  <div className={`px-8 py-2 rounded-full border-2 font-bold transition-all ${
                    cbState === 'CLOSED' ? 'border-green-500 text-green-500' :
                    cbState === 'OPEN' ? 'border-red-500 text-red-500 animate-pulse' : 'border-yellow-500 text-yellow-500'
                  }`}>
                    STATE: {cbState}
                  </div>
                </div>
                <button 
                  onClick={handleCbRequest} 
                  disabled={cbState === 'OPEN'}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg disabled:opacity-30"
                >
                  {cbState === 'OPEN' ? 'Circuit is Open - Request Blocked' : 'Execute Request'}
                </button>
                <p className="text-xs text-slate-500 text-center italic">
                  {cbState === 'OPEN' ? 'Circuit will attempt reset in 5s...' : '3 failures will trip the circuit.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTab;
