
import React, { useState } from 'react';
import { User, PaymentMethod, AppTheme } from '../types';
import AddPaymentModal from './AddPaymentModal';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onAddPayment: (method: PaymentMethod) => void;
  theme: AppTheme;
  toggleTheme: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onAddPayment, theme, toggleTheme }) => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <header className="text-white pb-4">
        <h1 className="text-4xl font-outfit font-black drop-shadow-md">Profile</h1>
        <p className="text-blue-50 text-sm font-bold drop-shadow-sm">Account & Security</p>
      </header>

      {/* Profile Info */}
      <div className={`rounded-[3.5rem] p-10 shadow-2xl flex flex-col items-center border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-blue-700 to-indigo-800 p-2 mb-6 shadow-2xl border-4 border-white">
          <div className={`w-full h-full rounded-[2.5rem] flex items-center justify-center text-6xl overflow-hidden shadow-inner ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            👤
          </div>
        </div>
        <h2 className={`text-3xl font-outfit font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>{user.username}</h2>
        <div className={`mt-2 px-4 py-1.5 rounded-full border ${isDark ? 'bg-amber-900/30 border-amber-800 text-amber-500' : 'bg-amber-100 border-amber-200 text-amber-800'}`}>
           <p className="text-[11px] font-black uppercase tracking-[0.25em]">Gold Status • 2024</p>
        </div>

        <div className={`w-full grid grid-cols-3 gap-6 mt-12`}>
          <div className="text-center">
            <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Points</p>
            <p className={`font-black text-3xl mt-1 tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>{user.points}</p>
          </div>
          <div className={`text-center border-x-2 px-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Streak</p>
            <p className={`font-black text-3xl mt-1 tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>{user.streak}d</p>
          </div>
          <div className="text-center">
            <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Net Profit</p>
            <p className={`font-black text-3xl text-green-500 mt-1 tracking-tighter`}>${user.totalEarned.toFixed(0)}</p>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className={`rounded-[3rem] p-8 shadow-2xl border space-y-6 transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <h3 className={`text-2xl font-outfit font-black italic ${isDark ? 'text-white' : 'text-slate-950'}`}>Appearance</h3>
        <button 
          onClick={toggleTheme}
          className={`w-full p-6 rounded-[2.5rem] border-2 flex items-center justify-between transition-all ${isDark ? 'bg-slate-800 border-blue-500/30 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
        >
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isDark ? 'bg-blue-600' : 'bg-white shadow-sm'}`}>
              {isDark ? '🌙' : '☀️'}
            </div>
            <div className="text-left">
              <p className="font-black text-lg">Dark Mode</p>
              <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{isDark ? 'Active' : 'Disabled'}</p>
            </div>
          </div>
          <div className={`w-14 h-8 rounded-full p-1 transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-300'}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </div>
        </button>
      </div>

      {/* Wallet Management */}
      <div className={`rounded-[3rem] p-8 shadow-2xl border space-y-6 transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="flex justify-between items-center px-2">
          <h3 className={`text-2xl font-outfit font-black italic ${isDark ? 'text-white' : 'text-slate-950'}`}>Digital Wallet</h3>
          <button 
            onClick={() => setShowAddPayment(true)}
            className="text-blue-500 text-[12px] font-black uppercase tracking-widest border-b-4 border-blue-500 pb-0.5 hover:text-blue-400 transition-colors"
          >
            + ADD NEW
          </button>
        </div>

        <div className="space-y-4">
          {user.paymentMethods.length > 0 ? (
            user.paymentMethods.map(method => (
              <div key={method.id} className={`p-5 rounded-3xl flex items-center justify-between border-2 transition-all hover:border-blue-400 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                <div className="flex items-center gap-5">
                  <span className="text-4xl filter drop-shadow-md">{method.type === 'paypal' ? '🅿️' : '💳'}</span>
                  <div>
                    <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{method.label}</p>
                    {method.isDefault && <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.15em] mt-1 block">Primary</span>}
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg"></div>
              </div>
            ))
          ) : (
            <div className={`py-10 text-center space-y-4 rounded-[2.5rem] border-2 border-dashed ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
               <div className="text-5xl grayscale opacity-50">💳</div>
               <p className={`text-[12px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>No payment links detected</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings List */}
      <div className={`rounded-[3rem] shadow-2xl overflow-hidden border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        {[
          { icon: '🔔', label: 'Push Notifications', action: '8:00 AM' },
          { icon: '🛡️', label: 'Biometric Access', action: 'Enabled' },
          { icon: '💬', label: 'Concierge Help', action: 'Live' },
        ].map((item, i) => (
          <div 
            key={i} 
            className={`flex justify-between items-center p-8 border-b last:border-none hover:bg-slate-50/5 transition-colors cursor-pointer group ${isDark ? 'border-slate-800' : 'border-slate-100'}`}
          >
            <div className="flex items-center gap-5">
              <span className={`text-3xl p-3 rounded-2xl group-hover:bg-blue-100/10 transition-colors shadow-inner ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>{item.icon}</span>
              <span className={`font-black text-lg tracking-tighter ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-black text-blue-500 uppercase tracking-widest">{item.action}</span>
              <svg className={`w-6 h-6 ${isDark ? 'text-slate-700' : 'text-slate-300'} group-hover:text-blue-500 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onLogout}
        className={`w-full py-6 rounded-3xl font-black border-2 text-rose-500 shadow-xl transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-[13px] ${isDark ? 'bg-slate-900 border-slate-800 hover:bg-rose-950/20 hover:border-rose-900' : 'bg-white border-slate-200 hover:bg-rose-50 hover:border-rose-300 shadow-slate-200/50'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Destroy Session
      </button>

      <div className="text-center opacity-30 py-10">
        <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em]">HABBITGOLD HQ • VER 2.1.0</p>
      </div>

      {showAddPayment && (
        <AddPaymentModal 
          onClose={() => setShowAddPayment(false)} 
          onAdd={(m) => {
            onAddPayment(m);
            setShowAddPayment(false);
          }} 
        />
      )}
    </div>
  );
};

export default ProfileScreen;
