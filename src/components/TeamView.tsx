import React, { useState } from 'react';
import { User } from '../types';
import { Users, Copy, Check, Share2, Award, TrendingUp, ShieldCheck } from 'lucide-react';

interface TeamViewProps {
  user: User;
}

export const TeamView: React.FC<TeamViewProps> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const inviteUrl = `https://dmfirst0.com/#/register?code=${user.inviteCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold backdrop-blur-sm">
            <Users className="w-3.5 h-3.5" />
            <span>Global Team Commission Program</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Invite Friends & Earn Rewards</h2>
          <p className="text-xs opacity-90 max-w-lg">
            Build your 3-tier affiliate network. Earn lifetime percentage commissions from your team's order-grabbing task completions.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/15 min-w-[160px]">
          <span className="text-[11px] font-semibold opacity-85">Total Team Commission</span>
          <div className="text-2xl font-black font-mono mt-0.5 text-amber-300">
            ${(user.teamStats.level1Commission + user.teamStats.level2Commission + user.teamStats.level3Commission).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Invite Link & QR Code Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Share2 className="w-4 h-4 text-amber-400" />
          <span>Your Exclusive Invitation Link & Code</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Invite Code</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={user.inviteCode}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-400 font-bold focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(user.inviteCode);
                    alert('Invite code copied to clipboard!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Copy Code
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Invitation URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={inviteUrl}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-300 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center text-[10px] text-amber-400 font-mono font-bold">
                QR CODE
              </div>
            </div>
            <span className="text-[11px] text-slate-400">Scan to Register</span>
          </div>
        </div>
      </div>

      {/* Team Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Level 1 Team (Direct)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold">10% Commission</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{user.teamStats.level1Count} Members</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Earned: ${user.teamStats.level1Commission.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Level 2 Team (Indirect)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold">5% Commission</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{user.teamStats.level2Count} Members</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Earned: ${user.teamStats.level2Commission.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Level 3 Team (Extended)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold">2% Commission</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{user.teamStats.level3Count} Members</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Earned: ${user.teamStats.level3Commission.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Team Member List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Recent Team Activity & Commission Records</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Member UID</th>
                <th className="py-3 px-4 font-semibold">Tier Level</th>
                <th className="py-3 px-4 font-semibold">Task Volume</th>
                <th className="py-3 px-4 font-semibold">Commission Payout</th>
                <th className="py-3 px-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
              <tr>
                <td className="py-3 px-4">user_88241x</td>
                <td className="py-3 px-4 text-amber-400">Level 1 (VIP 2)</td>
                <td className="py-3 px-4">$1,420.00</td>
                <td className="py-3 px-4 text-emerald-400">+$14.20</td>
                <td className="py-3 px-4 text-slate-500">2026-09-30 02:14</td>
              </tr>
              <tr>
                <td className="py-3 px-4">user_55923b</td>
                <td className="py-3 px-4 text-amber-400">Level 1 (VIP 3)</td>
                <td className="py-3 px-4">$3,150.00</td>
                <td className="py-3 px-4 text-emerald-400">+$31.50</td>
                <td className="py-3 px-4 text-slate-500">2026-09-29 22:40</td>
              </tr>
              <tr>
                <td className="py-3 px-4">user_11849q</td>
                <td className="py-3 px-4 text-blue-400">Level 2 (VIP 1)</td>
                <td className="py-3 px-4">$450.00</td>
                <td className="py-3 px-4 text-emerald-400">+$2.25</td>
                <td className="py-3 px-4 text-slate-500">2026-09-29 19:12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
