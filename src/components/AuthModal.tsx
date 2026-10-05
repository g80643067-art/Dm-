import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheck, Lock, User as UserIcon, Phone, Gift, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('demo_user');
  const [phone, setPhone] = useState('+1 555-0199');
  const [password, setPassword] = useState('••••••••');
  const [inviteCode, setInviteCode] = useState('DM9999');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    // Create mock user
    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      username: username.trim(),
      phone: phone.trim() || '+1 555-0199',
      balance: 100.00, // starting bonus $100
      frozenBalance: 0,
      todayEarnings: 12.50,
      totalEarnings: 340.80,
      vipLevel: 1,
      completedTasksToday: 4,
      maxTasksToday: 15,
      inviteCode: 'DM' + Math.floor(1000 + Math.random() * 9000),
      rechargeHistory: [
        { id: 'rec_1', amount: 100, method: 'USDT-TRC20', txid: '0x9a8f...4c21', status: 'success', timestamp: '2026-09-29 14:20' }
      ],
      withdrawalHistory: [
        { id: 'wit_1', amount: 50, address: 'TQn9Y2kh...j7xL', status: 'approved', timestamp: '2026-09-28 10:15' }
      ],
      taskHistory: [],
      teamStats: {
        level1Count: 12,
        level2Count: 5,
        level3Count: 2,
        level1Commission: 145.50,
        level2Commission: 48.20,
        level3Commission: 12.00,
        totalTeamBalance: 12450.00
      }
    };

    onLogin(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-6 text-slate-950 text-center relative">
          <div className="absolute top-3 right-3 bg-slate-950/25 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            SECURE PORTAL
          </div>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-xl mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">DMFirst Rewards</h2>
          <p className="text-xs font-medium opacity-90 mt-1">Global E-Commerce Task & Commission Hub</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${isLogin ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${!isLogin ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Invitation Code (Required)</label>
              <div className="relative">
                <Gift className="absolute left-3.5 top-3 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="DM9999"
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-500 transition-colors"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">New accounts receive an instant $100 starter trial bonus!</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>{isLogin ? 'Sign In to Dashboard' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center">
            <span className="text-xs text-slate-500">Protected by 256-bit SSL Secure Encryption</span>
          </div>
        </form>
      </div>
    </div>
  );
};
