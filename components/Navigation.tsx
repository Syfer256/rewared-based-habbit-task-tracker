
import React from 'react';
import { View, AppTheme } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  theme: AppTheme;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, theme }) => {
  const tabs = [
    { id: View.DASHBOARD, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: View.HABITS, label: 'Habits', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: View.REWARDS, label: 'Earn', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: View.PROFILE, label: 'Account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  const isDark = theme === 'dark';

  return (
    <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-md shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] border-2 rounded-[3rem] flex justify-around items-center h-24 px-6 z-50 transition-all duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
      {tabs.map((tab) => {
        const isActive = currentView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-500 w-20 h-16 rounded-[1.5rem] ${
              isActive ? 'text-blue-500 scale-110' : 'text-slate-500 hover:text-blue-400'
            }`}
          >
            <div className={`p-3 rounded-2xl transition-all ${isActive ? (isDark ? 'bg-blue-600/20 shadow-inner' : 'bg-blue-100/60 shadow-inner') : ''}`}>
              <svg
                className={`w-7 h-7 transition-all ${isActive ? 'fill-current' : 'fill-none stroke-current stroke-[3]'}`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
            </div>
            <span className={`text-[10px] mt-1.5 font-black uppercase tracking-[0.2em] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
