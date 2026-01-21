
import React, { useState, useRef } from 'react';
import { Habit, AppTheme } from '../types';
import { verifyTaskCompletion } from '../services/geminiService';

interface VerificationFlowProps {
  habit: Habit;
  onClose: () => void;
  onSuccess: (pts: number) => void;
  theme: AppTheme;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ habit, onClose, onSuccess, theme }) => {
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [media, setMedia] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [analysis, setAnalysis] = useState<{verified: boolean, feedback: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === 'dark';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startVerification = async () => {
    if (!media) return;
    setStage('analyzing');
    
    const result = await verifyTaskCompletion(habit.title, media, mimeType);
    setAnalysis(result);
    setStage('result');
  };

  const isVideo = mimeType.startsWith('video');

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl`}>
      <div className={`w-full max-w-sm rounded-[4rem] shadow-[0_45px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in zoom-in duration-300 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className={`text-3xl font-outfit font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>Security Scan</h2>
            <button onClick={onClose} className={`p-3 rounded-full transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {stage === 'upload' && (
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-slate-500 text-[12px] font-black uppercase tracking-widest">Target Objective</p>
                <p className="text-2xl font-black text-blue-500 tracking-tight leading-none italic">"{habit.title}"</p>
              </div>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-square w-full rounded-[3.5rem] border-4 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all overflow-hidden relative shadow-2xl group ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300 hover:bg-blue-50'}`}
              >
                {media ? (
                  isVideo ? (
                    <video src={media} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={media} alt="Upload" className="w-full h-full object-cover" />
                  )
                ) : (
                  <>
                    <div className={`w-24 h-24 shadow-2xl rounded-[2rem] flex items-center justify-center mb-6 border-2 group-hover:scale-110 transition-transform ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'}`}>
                      <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <span className={`font-black uppercase tracking-[0.3em] text-[11px] px-4 py-2 rounded-full shadow-md ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-700'}`}>Capture Proof</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Image or Video</span>
                    </div>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  capture="environment" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                />
              </div>

              <button
                disabled={!media}
                onClick={startVerification}
                className={`w-full py-6 rounded-3xl font-black text-white shadow-2xl transition-all flex items-center justify-center gap-3 tracking-[0.2em] text-lg ${
                  media 
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 shadow-blue-500/20 active:scale-95' 
                    : (isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-200 text-slate-500 cursor-not-allowed')
                }`}
              >
                AI VALIDATE
              </button>
            </div>
          )}

          {stage === 'analyzing' && (
            <div className="py-20 flex flex-col items-center space-y-10">
              <div className="relative">
                <div className={`w-32 h-32 border-8 rounded-full shadow-inner ${isDark ? 'border-slate-800' : 'border-slate-100'}`}></div>
                <div className="w-32 h-32 border-8 border-t-blue-500 border-r-indigo-500 rounded-full absolute top-0 animate-spin shadow-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-lg">🧬</div>
              </div>
              <div className="text-center space-y-3">
                <h3 className={`font-black text-3xl italic uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>Analyzing {isVideo ? 'Footage' : 'Data'}</h3>
                <p className="text-slate-500 text-[12px] font-black tracking-[0.3em] uppercase opacity-80">Syncing with HabbitGold AI</p>
              </div>
            </div>
          )}

          {stage === 'result' && analysis && (
            <div className="space-y-10 text-center animate-in zoom-in duration-500">
              <div className={`w-32 h-32 mx-auto rounded-[3rem] flex items-center justify-center text-6xl shadow-2xl border-4 ${
                analysis.verified 
                  ? (isDark ? 'bg-green-950/30 text-green-500 border-green-900/50' : 'bg-green-100 text-green-700 border-white') 
                  : (isDark ? 'bg-rose-950/30 text-rose-500 border-rose-900/50' : 'bg-rose-100 text-rose-700 border-white')
              }`}>
                {analysis.verified ? '✔️' : '✖️'}
              </div>
              
              <div className="space-y-4">
                <h3 className={`text-4xl font-black font-outfit tracking-tighter italic ${analysis.verified ? 'text-green-500' : 'text-rose-500'}`}>
                  {analysis.verified ? 'VALIDATED' : 'DECLINED'}
                </h3>
                <p className={`text-sm font-black px-6 leading-relaxed opacity-90 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{analysis.feedback}</p>
              </div>

              {analysis.verified ? (
                <div className="bg-blue-600 text-white p-6 rounded-[2.5rem] shadow-2xl border-b-8 border-blue-900 transition-all hover:-translate-y-1">
                  <p className="font-black text-2xl tracking-tight">+ {habit.pointsValue} GOLD UNLOCKED</p>
                </div>
              ) : (
                <button 
                  onClick={() => setStage('upload')}
                  className="text-blue-500 text-[12px] font-black uppercase tracking-[0.25em] underline decoration-4 underline-offset-8"
                >
                  RESCAN TARGET
                </button>
              )}

              <button
                onClick={() => {
                  if (analysis.verified) onSuccess(habit.pointsValue);
                  else onClose();
                }}
                className={`w-full py-6 rounded-3xl font-black text-white shadow-2xl transition-all active:scale-95 text-xl tracking-widest ${
                  analysis.verified ? 'bg-green-600 shadow-green-900/20' : 'bg-slate-950'
                }`}
              >
                {analysis.verified ? 'COLLECT ASSET' : 'TERMINATE'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationFlow;
