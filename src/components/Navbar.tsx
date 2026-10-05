import React, { useState } from 'react';
import { TabType, User } from '../types';
import { Home, Zap, Users, Wallet, User as UserIcon, Bell, MessageSquare, Globe, LogOut } from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  user: User;
  onLogout: () => void;
  onOpenSupport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onLogout,
  onOpenSupport
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [lang, setLang] = useState('English');

  const languages = ['English', 'Español', 'Português', 'Tiếng Việt', '中文', 'Bahasa Indonesia'];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span className="text-slate-950 font-extrabold text-xl tracking-tighter">DM</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              DMFirst <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">VIP {user.vipLevel}</span>
            </h1>
            <p className="text-xs text-slate-400">Global Rewards & Task Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${lang === l ? 'bg-amber-500/10 text-amber-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Support Button */}
          <button
            onClick={onOpenSupport}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 transition-colors relative"
            title="Customer Support"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          {/* User Balance Quick View */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs">
            <span className="text-slate-400">Balance:</span>
            <span className="font-bold text-amber-400 font-mono">${user.balance.toFixed(2)}</span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Bottom Mobile / Tablet Navigation Bar */}
      <nav aria-label="Main Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${currentTab === 'home' ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('tasks')}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all relative ${currentTab === 'tasks' ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Zap className="w-5 h-5" />
          <span className="text-[11px]">Task Hall</span>
          {user.completedTasksToday < user.maxTasksToday && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setCurrentTab('team')}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${currentTab === 'team' ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[11px]">Team</span>
        </button>

        <button
          onClick={() => setCurrentTab('finance')}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${currentTab === 'finance' ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[11px]">Wallet</span>
        </button>

        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${currentTab === 'profile' ? 'text-amber-400 bg-amber-500/10 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[11px]">Profile</span>
        </button>
      </nav>
    </>
  );
};
