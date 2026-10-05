import React from 'react';
import { User, TabType } from '../types';
import { ANNOUNCEMENTS, VIP_TIERS } from '../data/mockData';
import { Sparkles, ArrowUpRight, ArrowDownLeft, Zap, Users, ShieldCheck, Award, TrendingUp, ChevronRight, HelpCircle } from 'lucide-react';

interface DashboardViewProps {
  user: User;
  setCurrentTab: (tab: TabType) => void;
  onOpenSupport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, setCurrentTab, onOpenSupport }) => {
  const currentVip = VIP_TIERS[user.vipLevel] || VIP_TIERS[1];

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Global E-Commerce Rewards Hub</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-amber-400">{user.username}</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-lg">
              Complete daily order grabbing tasks to earn steady daily commission returns. Level up your VIP status for higher payouts.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setCurrentTab('finance')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Recharge</span>
            </button>
            <button
              onClick={() => setCurrentTab('finance')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Asset Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50">
            <span className="text-[11px] text-slate-400 font-medium">Total Assets (USD)</span>
            <div className="text-xl md:text-2xl font-black text-white mt-1 font-mono">
              ${user.balance.toFixed(2)}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Secure Wallet
            </span>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50">
            <span className="text-[11px] text-slate-400 font-medium">Today's Earnings</span>
            <div className="text-xl md:text-2xl font-black text-amber-400 mt-1 font-mono">
              +${user.todayEarnings.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {user.completedTasksToday}/{user.maxTasksToday} Tasks Completed
            </span>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50">
            <span className="text-[11px] text-slate-400 font-medium">Total Commission</span>
            <div className="text-xl md:text-2xl font-black text-white mt-1 font-mono">
              ${user.totalEarnings.toFixed(2)}
            </div>
            <span className="text-[10px] text-amber-400 mt-1 block">Lifetime Payouts</span>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50">
            <span className="text-[11px] text-slate-400 font-medium">Current VIP Level</span>
            <div className="text-xl md:text-2xl font-black text-amber-400 mt-1 flex items-center gap-2">
              <span>VIP {user.vipLevel}</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">{currentVip.name.split('-')[1]}</span>
          </div>
        </div>
      </div>

      {/* Marquee Announcement */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-3 overflow-hidden shadow-sm">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee text-xs text-slate-300 font-medium">
            {ANNOUNCEMENTS.join('   ✦   ')}
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentTab('tasks')}
          className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Task Hall</h3>
            <p className="text-xs text-slate-400 mt-0.5">Grab daily orders</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentTab('team')}
          className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Team Referral</h3>
            <p className="text-xs text-slate-400 mt-0.5">Earn 3-tier bonus</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentTab('finance')}
          className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Instant Deposit</h3>
            <p className="text-xs text-slate-400 mt-0.5">USDT & Bank transfer</p>
          </div>
        </button>

        <button
          onClick={onOpenSupport}
          className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 transition-all text-left group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">24/7 Support</h3>
            <p className="text-xs text-slate-400 mt-0.5">Live agent help</p>
          </div>
        </button>
      </div>

      {/* VIP Tiers Overview */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>VIP Upgrade Privileges</span>
          </h3>
          <button
            onClick={() => setCurrentTab('tasks')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Tiers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VIP_TIERS.slice(1, 4).map((tier) => (
            <div
              key={tier.level}
              className={`p-5 rounded-xl border transition-all ${user.vipLevel === tier.level ? 'bg-amber-500/5 border-amber-500/50 shadow-lg shadow-amber-500/10' : 'bg-slate-900 border-slate-800'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10">
                  VIP {tier.level}
                </span>
                <span className="text-xs font-mono text-slate-400">{(tier.commissionRate * 100).toFixed(2)}% Commission</span>
              </div>
              <h4 className="text-sm font-bold text-white">{tier.name}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tier.description}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Required Balance:</span>
                <span className="font-mono font-bold text-white">${tier.minBalance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Global Merchants */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Global Partner Merchants</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          {['Amazon', 'Shopee', 'Lazada', 'AliExpress', 'eBay'].map((merchant) => (
            <div key={merchant} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-sm">
                {merchant[0]}
              </div>
              <span className="text-xs font-semibold text-slate-300">{merchant}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
