
import React, { useState, useEffect } from 'react';
import { Habit, HistoryItem, ScanResult, AppTheme } from '../types';
import { runAIDataScan } from '../services/geminiService';

interface DataScanModalProps {
  habits: Habit[];
  history: HistoryItem[];
  onClose: () => void;
  theme: AppTheme;
}

const SCAN_MESSAGES = [
  "Initializing neural core...",
  "Decrypting habit database...",
  "Analyzing consistency patterns...",
  "Running productivity simulation...",
  "Optimizing reward structures...",
  "Finalizing audit report..."
];

const DataScanModal: React.FC<DataScanModalProps> = ({ habits, history, onClose, theme }) => {
  const [stage, setStage] = useState<'scanning' | 'results'>('scanning');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const isDark = theme === 'dark';

  useEffect(() => {
    const performScan = async () => {
      // Start the actual API call in parallel
      const scanPromise = runAIDataScan(habits, history);
      
      // Artificial delay for UX "theatre"
      const totalDuration = 3000;
      const intervalTime = 50;
      const steps = totalDuration / intervalTime;
      const increment = 100 / steps;

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + increment;
        });
      }, intervalTime);

      const messageTimer = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % SCAN_MESSAGES.length);
      }, 500);

      const data = await scanPromise;
      setResult(data);

      // Ensure we stay in scanning long enough for the animation to feel real
      setTimeout(() => {
        clearInterval(timer);
        clearInterval(messageTimer);
        setStage('results');
      }, totalDuration + 200);
    };

    performScan();
  }, [habits, history]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-white/20'} w-full max-w-sm rounded-[3.5rem] shadow-2xl overflow-hidden border animate-in fade-in zoom-in duration-500`}>
        <div className="p-10">
          {stage === 'scanning' ? (
            <div className="flex flex-col items-center py-8 space-y-10">
              <div className="relative w-48 h-48">
                {/* Outer Glow Ring */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
                
                {/* Animated Rings */}
                <div className={`absolute inset-0 border-[6px] border-dashed ${isDark ? 'border-slate-800' : 'border-blue-50'} rounded-full animate-[spin_8s_linear_infinite]`}></div>
                <div className="absolute inset-4 border-[6px] border-t-blue-600 border-r-indigo-400 rounded-full animate-spin"></div>
                <div className="absolute inset-8 border-[6px] border-b-cyan-500 border-l-sky-300 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                
                {/* Core Icon */}
                <div className="absolute inset-12 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full flex items-center justify-center text-5xl shadow-2xl border-4 border-white/20 z-10">
                  <span className="animate-pulse">🤖</span>
                </div>
                
                {/* Pulse Wave */}
                <div className="absolute inset-0 border-4 border-blue-500/50 rounded-full animate-ping opacity-20"></div>
              </div>

              <div className="text-center space-y-6 w-full px-2">
                <div className="space-y-1">
                  <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'} italic tracking-tighter uppercase`}>HabbitGold AI</h2>
                  <p className="text-blue-500 text-[11px] font-black uppercase tracking-[0.4em] animate-pulse">
                    {SCAN_MESSAGES[messageIndex]}
                  </p>
                </div>

                {/* Dynamic Progress Bar */}
                <div className="space-y-2">
                  <div className={`w-full h-4 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full p-1 overflow-hidden border border-white/10 shadow-inner`}>
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Processing Data...</span>
                    <span className="text-[12px] font-outfit font-black text-blue-500">{Math.round(progress)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full ${i < (progress / 33) ? 'bg-blue-600' : (isDark ? 'bg-slate-800' : 'bg-slate-200')} transition-colors duration-500`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-green-500/20">✅</div>
                  <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>Deep Audit</h2>
                </div>
                <div className="bg-blue-600 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Verified</div>
              </div>

              {/* Score Meters */}
              <div className="space-y-5">
                {[
                  { label: 'Health', value: result?.healthScore, color: 'bg-blue-500', icon: '🥗' },
                  { label: 'Focus', value: result?.productivityScore, color: 'bg-indigo-500', icon: '🎯' },
                  { label: 'Consistency', value: result?.consistencyScore, color: 'bg-cyan-500', icon: '⚡' }
                ].map((score) => (
                  <div key={score.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{score.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{score.label} Sector</span>
                      </div>
                      <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{score.value}%</span>
                    </div>
                    <div className={`w-full h-2.5 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full overflow-hidden border border-white/5`}>
                      <div 
                        className={`h-full ${score.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                        style={{ width: `${score.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'} p-6 rounded-[2.5rem] border shadow-inner`}>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} text-xs font-bold leading-relaxed italic`}>
                   "{result?.summary}"
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Gold-Mining Protocol</h4>
                <div className="space-y-3">
                  {result?.recommendations.map((rec, i) => (
                    <div key={i} className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'} flex items-start gap-4 p-4 rounded-[1.5rem] border group transition-all hover:translate-x-1`}>
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black flex-shrink-0">0{i+1}</span>
                      <span className={`text-[12px] font-bold leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className={`w-full py-6 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-950 text-white'} font-black rounded-3xl shadow-2xl active:scale-95 transition-all uppercase tracking-widest text-[13px] border-b-4 border-black/20`}
              >
                Acknowledge Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataScanModal;
