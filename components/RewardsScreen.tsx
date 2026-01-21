
import React, { useState } from 'react';
import { User, POINTS_CONVERSION_RATE, PaymentMethod, AppTheme } from '../types';

interface RewardsScreenProps {
  user: User;
  setUser: (u: any) => void;
  theme: AppTheme;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ user, setUser, theme }) => {
  const [cashoutAmount, setCashoutAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isDark = theme === 'dark';
  const defaultMethod = user.paymentMethods.find(m => m.isDefault) || user.paymentMethods[0];
  const maxDollars = user.points / POINTS_CONVERSION_RATE;

  const handleCashout = () => {
    const amount = parseFloat(cashoutAmount);
    if (!defaultMethod) {
      alert("Please link a payment method in your profile first.");
      return;
    }
    if (isNaN(amount) || amount < 1 || amount > maxDollars) {
      alert("Invalid cashout amount.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const pointsToDeduct = amount * POINTS_CONVERSION_RATE;
      const updatedUser = {
        ...user,
        points: user.points - pointsToDeduct,
        totalEarned: user.totalEarned + amount
      };
      setUser(updatedUser);
      setIsProcessing(false);
      setShowSuccess(true);
      setCashoutAmount('');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="text-center py-16 space-y-8 animate-in fade-in duration-500">
        <div className={`w-32 h-32 rounded-[3rem] mx-auto flex items-center justify-center text-7xl shadow-2xl border-4 ${isDark ? 'bg-slate-800 text-green-500 border-slate-700' : 'bg-green-100 text-green-700 border-white'}`}>💰</div>
        <div className="space-y-4">
          <h2 className={`text-4xl font-outfit font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>Gold Secured</h2>
          <p className={`font-black px-8 leading-relaxed text-lg ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Sent to <span className="text-blue-500">{defaultMethod?.label}</span>.</p>
        </div>
        <button 
          onClick={() => setShowSuccess(false)}
          className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl active:scale-95 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-950 text-white'}`}
        >
          GREAT
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="text-white pb-4">
        <h1 className="text-4xl font-outfit font-black drop-shadow-md">Earnings</h1>
        <p className="text-blue-50 text-sm font-bold drop-shadow-sm">Convert your efforts into hard currency.</p>
      </header>

      {/* Main Balance Card */}
      <div className={`rounded-[3.5rem] p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] text-center space-y-8 relative overflow-hidden border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/5 via-transparent to-transparent`}></div>
        <div className="relative z-10">
          <p className={`text-[12px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Redeemable Payout</p>
          <div className={`mt-4 text-8xl font-outfit font-black flex items-center justify-center tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <span className="text-blue-500 text-4xl mr-1 font-bold">$</span>
            {maxDollars.toFixed(2)}
          </div>
          <div className="inline-flex items-center gap-3 bg-blue-600 px-6 py-3 rounded-2xl mt-8 shadow-xl">
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"></div>
            <span className="text-white font-black text-sm uppercase tracking-widest">{user.points} TOTAL POINTS</span>
          </div>
        </div>
      </div>

      {/* Cashout Destination */}
      <div className={`rounded-[3rem] p-8 shadow-2xl space-y-8 border transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="flex justify-between items-center px-1">
          <h3 className={`text-2xl font-outfit font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Payout Portal</h3>
          {!defaultMethod && <span className="text-[11px] font-black text-rose-500 uppercase bg-rose-900/20 px-3 py-1 rounded-full border border-rose-900/30">Missing Account</span>}
        </div>
        
        {defaultMethod ? (
          <div className={`p-8 border-2 rounded-[2.5rem] flex items-center justify-between shadow-inner transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-blue-200 hover:bg-blue-50'}`}>
            <div className="flex items-center gap-6">
              <div className="text-5xl filter drop-shadow-md">{defaultMethod.type === 'paypal' ? '🅿️' : '💳'}</div>
              <div>
                <p className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>{defaultMethod.label}</p>
                <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.15em] mt-0.5">Primary Destination</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        ) : (
          <div className={`p-10 text-center rounded-[2.5rem] border-4 border-dashed ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
             <p className={`text-sm font-black px-4 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Your wallet is empty.</p>
             <p className="text-blue-500 text-[11px] font-black uppercase tracking-[0.2em] underline underline-offset-4 cursor-pointer">Configure in Settings</p>
          </div>
        )}

        <div className="space-y-4">
          <label className={`text-[12px] font-black uppercase tracking-widest ml-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Amount to Withdraw</label>
          <div className="relative">
             <span className="absolute left-7 top-1/2 -translate-y-1/2 text-blue-500 font-black text-3xl">$</span>
             <input 
               type="number"
               step="0.01"
               value={cashoutAmount}
               onChange={(e) => setCashoutAmount(e.target.value)}
               placeholder="0.00"
               className={`w-full pl-16 pr-8 py-6 border-2 rounded-3xl font-black text-4xl outline-none transition-all placeholder:text-slate-500/30 ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-950 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'}`}
             />
          </div>
        </div>

        <button
          disabled={isProcessing || !cashoutAmount || parseFloat(cashoutAmount) < 1 || !defaultMethod}
          onClick={handleCashout}
          className={`w-full py-6 rounded-3xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] ${
            isProcessing || !cashoutAmount || parseFloat(cashoutAmount) < 1 || !defaultMethod
              ? (isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none' : 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none')
              : 'bg-blue-600 text-white active:scale-95 shadow-blue-500/20'
          }`}
        >
          {isProcessing ? 'AUTHENTICATING...' : 'CASH OUT'}
        </button>
      </div>
    </div>
  );
};

export default RewardsScreen;
