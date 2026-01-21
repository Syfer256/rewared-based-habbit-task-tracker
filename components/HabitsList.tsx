
import React, { useState } from 'react';
import { Habit, DAILY_CAP, AppTheme } from '../types';
import VerificationFlow from './VerificationFlow';
import ReminderModal from './ReminderModal';
import AddHabitModal from './AddHabitModal';

interface HabitsListProps {
  habits: Habit[];
  onComplete: (id: string, pts: number) => void;
  onUpdateReminder: (id: string, time?: string) => void;
  onAddHabit: (habit: Habit) => void;
  dailyPoints: number;
  theme: AppTheme;
}

const HabitsList: React.FC<HabitsListProps> = ({ habits, onComplete, onAddHabit, onUpdateReminder, dailyPoints, theme }) => {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [reminderHabit, setReminderHabit] = useState<Habit | null>(null);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Health', 'Focus', 'Productivity', 'Personal'];
  const filteredHabits = habits.filter(h => filter === 'All' || h.category === filter);
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 relative min-h-[70vh]">
      <header className="text-white pb-4 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-outfit font-black drop-shadow-md">Habits</h1>
          <p className="text-blue-50 text-sm font-bold drop-shadow-sm">Convert discipline into capital.</p>
        </div>
        <button 
          onClick={() => setShowAddHabit(true)}
          className="bg-white/20 backdrop-blur-xl p-4 rounded-3xl border border-white/30 shadow-2xl active:scale-95 transition-all text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-4 rounded-[1.5rem] text-[12px] font-black transition-all whitespace-nowrap shadow-xl uppercase tracking-widest border-2 ${
              filter === cat 
                ? (isDark ? 'bg-white text-slate-900 border-white' : 'bg-white text-blue-800 border-white shadow-blue-900/20')
                : (isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-blue-900/50 text-white border-blue-400/30 backdrop-blur-xl')
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="grid grid-cols-1 gap-6 pb-12">
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => (
            <div 
              key={habit.id}
              className={`p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-2 transition-all duration-300 ${
                habit.completedToday 
                  ? (isDark ? 'border-slate-800 bg-slate-900/50 opacity-60 grayscale-[0.5]' : 'border-green-100 bg-white opacity-90 grayscale-[0.5]')
                  : (isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-100 hover:border-blue-400')
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em]">{habit.category}</span>
                    {habit.reminderTime && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isDark ? 'bg-amber-900/30 text-amber-500' : 'bg-amber-100 text-amber-600'}`}>
                        🔔 {habit.reminderTime}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-2xl font-outfit font-black mt-1 ${habit.completedToday ? (isDark ? 'text-slate-600' : 'text-slate-400') : (isDark ? 'text-white' : 'text-slate-950')}`}>
                    {habit.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                     <div className={`w-2 h-2 rounded-full ${habit.completedToday ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                     <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-[12px] font-black uppercase tracking-tight`}>
                      {habit.completedToday ? 'Mission Accomplished' : 'Awaiting Proof'}
                     </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className={`p-4 rounded-[1.5rem] shadow-lg border-2 ${habit.completedToday ? (isDark ? 'bg-slate-800 text-green-500 border-slate-700' : 'bg-green-50 text-green-600 border-green-100') : (isDark ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-blue-50 text-blue-700 border-blue-100')}`}>
                    {habit.completedToday ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-black text-2xl tracking-tighter">+{habit.pointsValue}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => setReminderHabit(habit)}
                    className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} ${habit.reminderTime ? 'text-amber-500' : 'text-slate-400 opacity-50'}`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                disabled={habit.completedToday}
                onClick={() => setSelectedHabit(habit)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[13px] shadow-2xl transition-all active:scale-95 ${
                  habit.completedToday 
                    ? (isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' : 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200')
                    : 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-blue-200'
                }`}
              >
                {habit.completedToday ? 'COMPLETED' : 'UPLOAD EVIDENCE'}
              </button>
            </div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="text-6xl opacity-20 filter grayscale">📋</div>
            <p className="font-black uppercase tracking-widest text-slate-400 text-xs">No habits found in this sector</p>
            <button 
              onClick={() => setShowAddHabit(true)}
              className="text-blue-500 font-black text-sm uppercase tracking-tighter underline underline-offset-4"
            >
              Initialize First Mission
            </button>
          </div>
        )}
      </div>

      {selectedHabit && (
        <VerificationFlow 
          habit={selectedHabit} 
          onClose={() => setSelectedHabit(null)} 
          onSuccess={(pts) => {
            onComplete(selectedHabit.id, pts);
            setSelectedHabit(null);
          }}
          theme={theme}
        />
      )}

      {reminderHabit && (
        <ReminderModal
          habit={reminderHabit}
          onClose={() => setReminderHabit(null)}
          onSave={(time) => {
            onUpdateReminder(reminderHabit.id, time);
            setReminderHabit(null);
          }}
          theme={theme}
        />
      )}

      {showAddHabit && (
        <AddHabitModal
          onClose={() => setShowAddHabit(false)}
          onAdd={(h) => {
            onAddHabit(h);
            setShowAddHabit(false);
          }}
          theme={theme}
        />
      )}
    </div>
  );
};

export default HabitsList;
