
import React, { useState } from 'react';
import { PaymentType, PaymentMethod } from '../types';

interface AddPaymentModalProps {
  onClose: () => void;
  onAdd: (method: PaymentMethod) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ onClose, onAdd }) => {
  const [type, setType] = useState<PaymentType>('credit_card');
  const [formData, setFormData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    email: ''
  });

  const handleAdd = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const label = type === 'credit_card' 
      ? `Card ending in ${formData.number.slice(-4)}`
      : formData.email;
    
    onAdd({
      id,
      type,
      label,
      isDefault: true,
      provider: type === 'credit_card' ? 'visa' : 'paypal'
    });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-800">Link Wallet</h2>
            <button onClick={onClose} className="p-2 bg-slate-50 rounded-full">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Toggle Type */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setType('credit_card')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${type === 'credit_card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              Card
            </button>
            <button 
              onClick={() => setType('paypal')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${type === 'paypal' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              PayPal
            </button>
          </div>

          <div className="space-y-4">
            {type === 'credit_card' ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    value={formData.number}
                    onChange={e => setFormData({...formData, number: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-blue-200 transition-all"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={e => setFormData({...formData, expiry: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-blue-200 transition-all"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                    <input 
                      type="password" 
                      placeholder="***"
                      value={formData.cvv}
                      onChange={e => setFormData({...formData, cvv: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-blue-200 transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PayPal Email</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold text-slate-700 outline-none border-2 border-transparent focus:border-blue-200 transition-all"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            Confirm Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;
