
import React, { useState } from 'react';
import { User, Habit, DAILY_CAP, HistoryItem, AppTheme } from '../types';
import DataScanModal from './DataScanModal';

interface DashboardProps {
  user: User;
  habits: Habit[];
  history: HistoryItem[];
  toggleTheme: () => void;
  theme: AppTheme;
}

const Dashboard: React.FC<DashboardProps> = ({ user, habits, history, toggleTheme, theme }) => {
  const [showScan, setShowScan] = useState(false);
  const completedCount = habits.filter(h => h.completedToday).length;
  const progressPercent = (user.dailyPoints / DAILY_CAP) * 100;

  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center text-white pb-4">
        <div>
          <h1 className="text-3xl font-outfit font-black drop-shadow-md">Hi, {user.username}!</h1>
          <p className="text-blue-50 text-sm font-bold opacity-100">{habits.length - completedCount} habits left today</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={toggleTheme}
            className="bg-white/30 p-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-xl transition-all active:scale-95"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <div className="bg-white/30 p-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-xl">
            <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </header>

      {/* Database/AI Scan Button */}
      <button 
        onClick={() => setShowScan(true)}
        className={`w-full ${isDark ? 'bg-slate-900/40' : 'bg-white/10'} backdrop-blur-2xl border border-white/40 p-5 rounded-[2.5rem] flex items-center justify-between text-white active:scale-95 transition-all shadow-2xl group`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 ${isDark ? 'bg-slate-800' : 'bg-white'} rounded-3xl flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform`}>🧠</div>
          <div className="text-left">
            <h4 className="font-black text-sm uppercase tracking-widest drop-shadow-sm">AI Data Insights</h4>
            <p className="text-[10px] text-blue-50 font-black opacity-100">Scan {history.length} database records</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${isDark ? 'bg-blue-600 text-white' : 'bg-white text-blue-700'}`}>Run Scan</div>
      </button>

      {/* Points Card */}
      <div className={`rounded-[2.5rem] p-8 shadow-2xl border transition-colors duration-500 overflow-hidden relative group ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-3xl transition-all ${isDark ? 'bg-blue-900/30' : 'bg-blue-100/60'}`}></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Current Balance</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-5xl font-outfit font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>{user.points}</span>
                <span className="text-amber-600 font-black text-xl italic uppercase">Gold</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Liquid Value</span>
              <div className="text-3xl font-black text-green-500 mt-1">${(user.points / 100).toFixed(2)}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className={`flex justify-between text-[11px] font-black ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className="uppercase tracking-widest">Daily Cap Progress</span>
              <span className="text-blue-500">{user.dailyPoints} / {DAILY_CAP} PTS</span>
            </div>
            <div className={`w-full h-5 rounded-full overflow-hidden border p-1 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-6 rounded-[2.5rem] shadow-xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className={`p-3.5 rounded-2xl shadow-inner ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Streak</p>
            <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{user.streak}d</p>
          </div>
        </div>
        <div className={`p-6 rounded-[2.5rem] shadow-xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className={`p-3.5 rounded-2xl shadow-inner ${isDark ? 'bg-amber-900/40' : 'bg-amber-100'}`}>
            <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Payouts</p>
            <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>${user.totalEarned.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Focus List */}
      <section className={`rounded-[3rem] p-8 shadow-2xl border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <h3 className={`text-2xl font-outfit font-black mb-6 px-1 italic ${isDark ? 'text-white' : 'text-slate-950'}`}>Active Missions</h3>
        <div className="space-y-5">
          {habits.slice(0, 3).map(habit => (
            <div key={habit.id} className={`flex justify-between items-center p-5 rounded-3xl border transition-all hover:border-blue-300 group ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full shadow-inner border-2 ${habit.completedToday ? 'bg-green-500 border-green-200' : 'bg-blue-600 border-blue-200 animate-pulse'}`}></div>
                <div>
                  <h4 className={`font-black text-lg ${habit.completedToday ? 'text-slate-500 line-through' : (isDark ? 'text-white' : 'text-slate-800')}`}>{habit.title}</h4>
                  <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{habit.category}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-2xl text-[11px] font-black border-2 transition-all ${habit.completedToday ? 'bg-slate-700/50 text-slate-500 border-slate-700' : 'bg-blue-600/10 text-blue-500 border-blue-500/20 shadow-sm group-hover:scale-110'}`}>
                {habit.completedToday ? 'VERIFIED' : `+${habit.pointsValue} PT`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showScan && (
        <DataScanModal 
          habits={habits} 
          history={history} 
          onClose={() => setShowScan(false)} 
          theme={theme}
        />
      )}
    </div>
  );
};

export default Dashboard;
