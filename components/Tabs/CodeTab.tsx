
import React, { useState } from 'react';

const CodeTab: React.FC = () => {
  const [inputPath, setInputPath] = useState('/users/123');
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const testRoute = () => {
    setResult(null);
    if (inputPath.startsWith('/users')) {
      setActiveLine(1);
      setTimeout(() => setResult(`Routing to Internal Service: http://user-service:8080${inputPath}`), 300);
    } else if (inputPath.startsWith('/products')) {
      setActiveLine(2);
      setTimeout(() => setResult(`Routing to Internal Service: http://product-service:8081${inputPath}`), 300);
    } else if (inputPath.startsWith('/auth')) {
      setActiveLine(3);
      setTimeout(() => setResult(`Routing to Internal Service: http://auth-service:9000${inputPath}`), 300);
    } else {
      setActiveLine(5);
      setTimeout(() => setResult('404 Not Found - Path does not match any known microservice'), 300);
    }
  };

  const codeLines = [
    { num: 1, text: "app.use('/users', createProxyMiddleware({ target: 'http://user-service' }));" },
    { num: 2, text: "app.use('/products', createProxyMiddleware({ target: 'http://product-service' }));" },
    { num: 3, text: "app.use('/auth', createProxyMiddleware({ target: 'http://auth-service' }));" },
    { num: 4, text: "" },
    { num: 5, text: "app.use((req, res) => res.status(404).send('No route found'));" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Implementation & Code</h2>
        <p className="text-slate-400">See how a simple proxy gateway is configured in Node.js.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Code View */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-t-lg border border-slate-700">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <span className="text-xs font-mono text-slate-500 italic">gateway.js</span>
           </div>
           <div className="bg-[#1e1e1e] p-6 border border-slate-800 border-t-0 rounded-b-lg overflow-x-auto min-h-[300px]">
             <pre className="code-font text-sm">
                {codeLines.map(line => (
                  <div 
                    key={line.num} 
                    className={`flex gap-6 transition-colors duration-300 ${activeLine === line.num ? 'bg-cyan-500/20 ring-l-4 ring-cyan-500' : ''}`}
                  >
                    <span className="w-4 text-slate-600 text-right select-none">{line.num}</span>
                    <span className={line.text ? 'text-slate-300' : ''}>
                      {line.text ? (
                        <>
                          <span className="text-purple-400">app</span>
                          <span className="text-slate-400">.</span>
                          <span className="text-blue-400">use</span>
                          <span className="text-slate-400">(</span>
                          <span className="text-green-400">{line.text.match(/'[^']+'/)?.[0]}</span>
                          <span className="text-slate-400">, ...);</span>
                        </>
                      ) : '\u00A0'}
                    </span>
                  </div>
                ))}
             </pre>
           </div>
        </div>

        {/* Input/Test Area */}
        <div className="flex flex-col gap-6 bg-slate-800/30 border border-slate-700 rounded-2xl p-8">
           <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">Simulation Input</label>
              <div className="flex gap-2">
                 <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">GET</span>
                    <input 
                      type="text" 
                      value={inputPath}
                      onChange={(e) => setInputPath(e.target.value)}
                      placeholder="/users/123"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-14 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono text-cyan-400"
                    />
                 </div>
                 <button 
                  onClick={testRoute}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-6 py-3 rounded-lg transition-transform active:scale-95"
                 >
                   Test Route
                 </button>
              </div>
              <p className="text-xs text-slate-500">Try typing: <button onClick={() => setInputPath('/users/jane')} className="underline">/users/jane</button>, <button onClick={() => setInputPath('/products/p-100')} className="underline">/products/p-100</button>, or <button onClick={() => setInputPath('/unknown')} className="underline">/unknown</button></p>
           </div>

           <div className="flex-1 mt-4">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Proxy Result</label>
              <div className={`p-6 rounded-xl border-2 border-dashed min-h-[120px] flex items-center justify-center text-center transition-all ${result ? 'bg-slate-900 border-cyan-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                {result ? (
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-cyan-500/10 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                    <p className="text-lg font-mono text-cyan-400">{result}</p>
                    <p className="text-xs text-slate-500 italic">Internal network resolution successful</p>
                  </div>
                ) : (
                  <p className="text-slate-600 italic">Enter a path and click "Test Route" to see the proxy logic in action</p>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTab;
