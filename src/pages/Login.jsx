import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { User, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Login = () => {
  const { login, register, loginDemoCustomer, loginDemoAdmin, user } = useShop();
  const navigate = useNavigate();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // If already logged in, show quick redirect
  if (user) {
    return (
      <div className="min-h-[70vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wider mb-2">
          Signed In as {user.name}
        </h2>
        <p className="font-mono-tech text-xs text-white/50 mb-6 uppercase">
          ROLE: {user.role} ({user.email})
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/account')}
            className="px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-wider cursor-pointer"
          >
            Access Customer Portal
          </button>
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-3 border border-white text-white font-mono-tech text-xs uppercase font-bold tracking-wider cursor-pointer"
            >
              Open Admin Console
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      register(fullName, email, password);
      navigate('/account');
    } else {
      login(email, password);
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    }
  };

  const handleQuickCustomer = () => {
    loginDemoCustomer();
    navigate('/account');
  };

  const handleQuickAdmin = () => {
    loginDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#121212] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8 pb-6 border-b border-white/10">
          <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40 block">
            VØID ATELIER // ACCESS CONTROL
          </span>
          <h1 className="font-display text-2xl uppercase tracking-wider font-extrabold">
            {isRegisterMode ? 'Patron Registration' : 'Client Authentication'}
          </h1>
          <p className="font-editorial text-xs text-white/50">
            {isRegisterMode
              ? 'Create your archival profile to track allocations and priority drops.'
              : 'Enter your credentials to access order tracking and client privileges.'}
          </p>
        </div>

        {/* 1-Click Demo Logins for fast testing! */}
        <div className="mb-6 p-4 bg-[#181818] border border-white/10 space-y-2.5">
          <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40 block">
            FAST DEMO LOGINS (ONE CLICK):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="py-2.5 px-3 bg-white text-black font-mono-tech text-[11px] uppercase font-bold tracking-wider hover:bg-[#E5E5E0] transition-colors cursor-pointer text-center"
            >
              Demo Patron
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="py-2.5 px-3 bg-[#242424] hover:bg-[#333333] border border-white/20 text-white font-mono-tech text-[11px] uppercase font-bold tracking-wider transition-colors cursor-pointer text-center"
            >
              Director Admin
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Julian Vance"
                className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="julian@voidatelier.com"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono-tech uppercase text-white/50 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-xs font-mono-tech text-white focus:outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-white text-black font-mono-tech text-xs uppercase font-extrabold tracking-widest hover:bg-[#E5E5E0] transition-colors cursor-pointer shadow-lg mt-2"
          >
            {isRegisterMode ? 'Register Patron Profile' : 'Authenticate'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-6 mt-6 border-t border-white/10 text-center font-mono-tech text-xs text-white/50">
          {isRegisterMode ? (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="text-white underline hover:text-white/80 cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New patron?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="text-white underline hover:text-white/80 cursor-pointer"
              >
                Register Account
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
