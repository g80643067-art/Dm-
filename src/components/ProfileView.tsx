import React from 'react';
import { User } from '../types';
import { VIP_TIERS } from '../data/mockData';
import { User as UserIcon, Award, Phone, ShieldCheck, FileText, LogOut, CheckCircle2 } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const currentVip = VIP_TIERS[user.vipLevel] || VIP_TIERS[1];

  return (
    <div className="space-y-6 pb-24">
      {/* Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                <span>{user.username}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  VIP {user.vipLevel}
                </span>
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Phone className="w-3 h-3" /> <span>{user.phone}</span>
                <span className="mx-1">·</span>
                <span className="font-mono text-amber-400">UID: {user.id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors text-xs font-semibold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* VIP Status Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Membership Status</span>
          </h3>
          <span className="text-xs font-mono text-amber-400 font-bold">{currentVip.name}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Daily Task Quota</span>
            <span className="text-white font-mono">{user.completedTasksToday} / {user.maxTasksToday} Completed</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500"
              style={{ width: `${(user.completedTasksToday / user.maxTasksToday) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Task History Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Completed Task Commission Records</span>
        </h3>

        {user.taskHistory.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No tasks completed yet today. Head over to the Task Hall to start grabbing orders!
          </div>
        ) : (
          <div className="space-y-3">
            {user.taskHistory.map((task) => (
              <div key={task.id} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={task.productImage} alt={task.productName} className="w-12 h-12 object-cover rounded-lg border border-slate-800" />
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{task.productName}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{task.platform} · {task.orderNumber}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400 font-mono">+${task.commission.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{task.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Security & Account Settings</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Login Password</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Secure password configured</div>
            </div>
            <button
              onClick={() => alert('Password modification feature active')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Change
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-white">Fund Withdrawal Password</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Required for all withdrawals</div>
            </div>
            <button
              onClick={() => alert('Fund password modification active')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Modify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
