
import React, { useState } from 'react';
import Logo from './Logo';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10 text-white">
        <div className="mb-6 flex justify-center">
           <Logo size={140} />
        </div>
        <h1 className="text-5xl font-outfit font-black tracking-tight drop-shadow-2xl">HabbitGold</h1>
        <p className="text-blue-50 font-bold mt-2 opacity-100 drop-shadow-sm">Your habits are worth actual money.</p>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] space-y-8 border border-slate-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-outfit font-black text-slate-950">
            {isSignup ? 'Start Earning' : 'Sign In'}
          </h2>
          <p className="text-slate-600 text-sm font-bold">
            {isSignup ? 'Complete tasks, take proof, get paid.' : 'Track your progress and redeem points.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase ml-1 tracking-widest">Username / Email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input 
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {!isSignup && (
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1 tracking-widest">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-200 active:scale-95 transition-all uppercase tracking-widest"
          >
            {isSignup ? 'CREATE ACCOUNT' : 'LOG IN'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-700 text-sm font-black hover:text-indigo-800 transition-colors uppercase tracking-tight"
          >
            {isSignup ? 'Already have an account? Log In' : "New here? Join for free"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
