
import React, { useState } from 'react';
import { Habit, AppTheme } from '../types';

interface ReminderModalProps {
  habit: Habit;
  onClose: () => void;
  onSave: (time?: string) => void;
  theme: AppTheme;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ habit, onClose, onSave, theme }) => {
  const [time, setTime] = useState(habit.reminderTime || '08:00');
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={`w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="p-10 space-y-8 text-center">
          <div className="flex justify-between items-center mb-2">
            <h2 className={`text-2xl font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Set Reminder</h2>
            <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-2xl ${isDark ? 'bg-slate-800' : 'bg-blue-50'}`}>
               🔔
            </div>
            <div>
              <p className={`text-lg font-black tracking-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{habit.title}</p>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mt-1">Daily Discipline Notification</p>
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Alert Time</label>
             <input 
               type="time"
               value={time}
               onChange={(e) => setTime(e.target.value)}
               className={`w-full px-6 py-5 rounded-2xl font-black text-3xl text-center outline-none border-4 transition-all ${
                 isDark 
                   ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                   : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-blue-500'
               }`}
             />
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => onSave(time)}
              className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-widest text-sm"
            >
              SAVE REMINDER
            </button>
            <button
              onClick={() => onSave(undefined)}
              className={`w-full py-4 font-black rounded-2xl transition-all uppercase tracking-widest text-[10px] ${isDark ? 'text-rose-500 bg-rose-500/10' : 'text-rose-500 bg-rose-50'}`}
            >
              DISABLE ALERTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
