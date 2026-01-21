
export enum View {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  HABITS = 'HABITS',
  REWARDS = 'REWARDS',
  PROFILE = 'PROFILE'
}

export type PaymentType = 'credit_card' | 'paypal';
export type AppTheme = 'light' | 'dark';

export interface PaymentMethod {
  id: string;
  type: PaymentType;
  label: string; // e.g. "Visa **** 4242" or "user@email.com"
  isDefault: boolean;
  provider?: string; // "visa", "mastercard", etc.
}

export interface User {
  id: string;
  username: string;
  points: number;
  dailyPoints: number;
  lastActive: string;
  streak: number;
  totalEarned: number;
  paymentMethods: PaymentMethod[];
  theme: AppTheme;
}

export interface Habit {
  id: string;
  title: string;
  category: 'Health' | 'Focus' | 'Productivity' | 'Personal';
  frequency: string;
  completedToday: boolean;
  pointsValue: number;
  reminderTime?: string; // HH:mm format
}

export interface HistoryItem {
  id: string;
  habitId: string;
  habitTitle: string;
  timestamp: string;
  pointsEarned: number;
  status: 'verified' | 'pending';
}

export interface ScanResult {
  healthScore: number;
  productivityScore: number;
  consistencyScore: number;
  summary: string;
  recommendations: string[];
}

export const POINTS_CONVERSION_RATE = 100; // 100 pts = $1
export const DAILY_CAP = 5;
