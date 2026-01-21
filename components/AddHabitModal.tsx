
import React, { useState } from 'react';
import { Habit, AppTheme } from '../types';

interface AddHabitModalProps {
  onClose: () => void;
  onAdd: (habit: Habit) => void;
  theme: AppTheme;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose, onAdd, theme }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Habit['category']>('Productivity');
  
  const categories: Habit['category'][] = ['Health', 'Focus', 'Productivity', 'Personal'];
  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      category,
      frequency: 'Daily',
      completedToday: false,
      pointsValue: 1
    };

    onAdd(newHabit);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={`w-full max-w-sm rounded-[3.5rem] shadow-2xl overflow-hidden border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="p-10 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-outfit font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>New Mission</h2>
            <button onClick={onClose} className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Objective Name</label>
              <input 
                autoFocus
                required
                type="text"
                placeholder="e.g. Morning Meditation"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={`w-full px-6 py-5 rounded-2xl font-bold text-lg outline-none border-2 transition-all ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category Sector</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${
                      category === cat
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : (isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-5 rounded-2xl border-2 flex items-center justify-between ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Reward Value</span>
               <span className="font-black text-blue-600">1.0 GOLD</span>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-widest"
            >
              INITIALIZE HABIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
