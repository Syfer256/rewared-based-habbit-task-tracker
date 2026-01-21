
import React, { useState, useEffect, useRef } from 'react';
import { View, User, Habit, DAILY_CAP, HistoryItem, PaymentMethod, AppTheme } from './types';
import { db } from './services/db';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import HabitsList from './components/HabitsList';
import RewardsScreen from './components/RewardsScreen';
import ProfileScreen from './components/ProfileScreen';
import Navigation from './components/Navigation';

const INITIAL_HABITS: Habit[] = [
  { id: '1', title: 'Morning Exercise', category: 'Health', frequency: 'Daily', completedToday: false, pointsValue: 1 },
  { id: '2', title: 'Read 20 Pages', category: 'Focus', frequency: 'Daily', completedToday: false, pointsValue: 1 },
  { id: '3', title: 'Healthy Meal', category: 'Health', frequency: 'Daily', completedToday: false, pointsValue: 1 },
  { id: '4', title: 'Deep Work Session', category: 'Productivity', frequency: 'Daily', completedToday: false, pointsValue: 1 },
  { id: '5', title: 'Evening Reflection', category: 'Personal', frequency: 'Daily', completedToday: false, pointsValue: 1 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [theme, setTheme] = useState<AppTheme>('light');
  const lastCheckedMinute = useRef<string | null>(null);

  useEffect(() => {
    const savedUser = db.getUser();
    const savedHabits = db.getHabits();
    const savedHistory = db.getHistory();
    
    if (savedUser) {
      setUser(savedUser);
      setTheme(savedUser.theme || 'light');
    }
    if (savedHabits.length > 0) setHabits(savedHabits);
    setHistory(savedHistory);

    // Request notification permissions
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Reminder timer
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (lastCheckedMinute.current !== currentTime) {
        lastCheckedMinute.current = currentTime;
        
        const currentHabits = db.getHabits();
        currentHabits.forEach(habit => {
          if (habit.reminderTime === currentTime && !habit.completedToday) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('HabbitGold Reminder', {
                body: `Time to complete your habit: ${habit.title}!`,
                icon: 'https://cdn-icons-png.flaticon.com/512/1040/1040230.png'
              });
            } else {
              alert(`HabbitGold Reminder: ${habit.title}`);
            }
          }
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (username: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      points: 25,
      dailyPoints: 0,
      lastActive: new Date().toISOString(),
      streak: 1,
      totalEarned: 0,
      paymentMethods: [],
      theme: 'light'
    };
    setUser(newUser);
    db.saveUser(newUser);
    const existingHabits = db.getHabits();
    if (existingHabits.length === 0) {
      db.saveHabits(INITIAL_HABITS);
      setHabits(INITIAL_HABITS);
    } else {
      setHabits(existingHabits);
    }
    setCurrentView(View.DASHBOARD);
  };

  const toggleTheme = () => {
    if (!user) return;
    const newTheme: AppTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    const updatedUser: User = { ...user, theme: newTheme };
    setUser(updatedUser);
    db.saveUser(updatedUser);
  };

  const completeHabit = (habitId: string, earnedPoints: number) => {
    if (!user) return;
    if (user.dailyPoints >= DAILY_CAP) {
      alert("Daily point cap reached!");
    }
    const habit = habits.find(h => h.id === habitId);
    const updatedHabits = habits.map(h => 
      h.id === habitId ? { ...h, completedToday: true } : h
    );
    const actualPoints = user.dailyPoints < DAILY_CAP ? earnedPoints : 0;
    const updatedUser: User = {
      ...user,
      points: user.points + actualPoints,
      dailyPoints: user.dailyPoints + actualPoints
    };
    const historyItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      habitId,
      habitTitle: habit?.title || 'Unknown Task',
      timestamp: new Date().toISOString(),
      pointsEarned: actualPoints,
      status: 'verified'
    };
    setUser(updatedUser);
    setHabits(updatedHabits);
    setHistory(prev => [historyItem, ...prev]);
    db.saveUser(updatedUser);
    db.saveHabits(updatedHabits);
    db.addHistory(historyItem);
  };

  const addHabit = (newHabit: Habit) => {
    const updatedHabits = [newHabit, ...habits];
    setHabits(updatedHabits);
    db.saveHabits(updatedHabits);
  };

  const updateHabitReminders = (habitId: string, time?: string) => {
    const updatedHabits = habits.map(h => 
      h.id === habitId ? { ...h, reminderTime: time } : h
    );
    setHabits(updatedHabits);
    db.saveHabits(updatedHabits);
  };

  const addPaymentMethod = (method: PaymentMethod) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      paymentMethods: [...user.paymentMethods.map(m => ({...m, isDefault: false})), method]
    };
    setUser(updatedUser);
    db.saveUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
    db.clear();
    setTheme('light');
    setCurrentView(View.LOGIN);
  };

  const renderContent = () => {
    if (!user && currentView !== View.LOGIN) return <LoginScreen onLogin={handleLogin} />;
    switch (currentView) {
      case View.LOGIN: return <LoginScreen onLogin={handleLogin} />;
      case View.DASHBOARD: return <Dashboard user={user!} habits={habits} history={history} toggleTheme={toggleTheme} theme={theme} />;
      case View.HABITS: return <HabitsList habits={habits} onComplete={completeHabit} onAddHabit={addHabit} onUpdateReminder={updateHabitReminders} dailyPoints={user?.dailyPoints || 0} theme={theme} />;
      case View.REWARDS: return <RewardsScreen user={user!} setUser={setUser} theme={theme} />;
      case View.PROFILE: return <ProfileScreen user={user!} onLogout={logout} onAddPayment={addPaymentMethod} theme={theme} toggleTheme={toggleTheme} />;
      default: return <Dashboard user={user!} habits={habits} history={history} toggleTheme={toggleTheme} theme={theme} />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 max-w-md mx-auto shadow-2xl relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`absolute top-0 left-0 w-full h-[450px] bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500 -z-10 rounded-b-[4rem] opacity-100 shadow-2xl`}></div>
      <main className="flex-1 pb-24 overflow-y-auto pt-8 px-6">{renderContent()}</main>
      {user && <Navigation currentView={currentView} setView={setCurrentView} theme={theme} />}
    </div>
  );
};

export default App;
