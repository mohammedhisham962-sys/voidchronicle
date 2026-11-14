import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#141414] border border-white/15 text-white p-4 shadow-2xl flex items-start gap-3.5 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-white" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#A0A0A0]" />}
            {toast.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-400" />}
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider font-mono-tech text-white/50 mb-0.5">
              {toast.type === 'error' ? 'Notice' : 'Atelier System'}
            </p>
            <p className="text-xs font-medium tracking-tight text-white leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/40 hover:text-white transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
