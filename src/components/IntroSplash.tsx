import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface IntroSplashProps {
  onEnter: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    const timer = setTimeout(() => {
      onEnter();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onEnter]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-slate-950 text-white p-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="absolute top-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header / Status */}
      <div className="relative z-10 w-full max-w-md flex items-center justify-between text-xs text-amber-300 font-mono pt-4">
        <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>256-Bit SSL Secured</span>
        </div>
        <span className="opacity-70">v3.8.2 Secure</span>
      </div>

      {/* Center Artwork & Branding */}
      <div className="relative z-10 w-full max-w-md my-auto flex flex-col items-center text-center space-y-6">
        <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 group">
          <img
            src="/src/assets/images/dmfirst_intro_splash_1790766561413.jpg"
            alt="DMFirst Splash"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-bold text-amber-300 tracking-wider">SECURE REWARDS PLATFORM</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-amber-400 tracking-tight font-serif drop-shadow-md">
            Fast, Safe & Stable Withdrawals
          </h1>
          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            Global e-commerce task completion, VIP rewards, and instant multi-tier commission payout.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>Loading Secure Environment</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="relative z-10 w-full max-w-md pb-6 space-y-4">
        <button
          onClick={onEnter}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Enter DmFirst Platform</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center">
          <p className="text-[11px] text-slate-500 font-mono tracking-widest uppercase">
            DmFirst · Play · Win · Trust
          </p>
        </div>
      </div>
    </div>
  );
};
