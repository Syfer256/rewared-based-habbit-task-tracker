
import { User, Habit, HistoryItem } from '../types';

const DB_KEYS = {
  USER: 'hg_db_user',
  HABITS: 'hg_db_habits',
  HISTORY: 'hg_db_history'
};

export const db = {
  // User Operations
  saveUser: (user: User) => {
    localStorage.setItem(DB_KEYS.USER, JSON.stringify(user));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(DB_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  // Habit Operations
  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(DB_KEYS.HABITS, JSON.stringify(habits));
  },
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(DB_KEYS.HABITS);
    return data ? JSON.parse(data) : [];
  },

  // History Operations
  addHistory: (item: HistoryItem) => {
    const history = db.getHistory();
    history.unshift(item); // Newest first
    localStorage.setItem(DB_KEYS.HISTORY, JSON.stringify(history.slice(0, 50))); // Keep last 50
  },
  getHistory: (): HistoryItem[] => {
    const data = localStorage.getItem(DB_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  },

  clear: () => {
    Object.values(DB_KEYS).forEach(key => localStorage.removeItem(key));
  }
};
