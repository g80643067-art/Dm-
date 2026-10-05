import React, { useState } from 'react';
import { User, RechargeRecord, WithdrawalRecord } from '../types';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, Copy, Check, Clock, AlertCircle } from 'lucide-react';

interface FinanceViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ user, onUpdateUser }) => {
  const [subTab, setSubTab] = useState<'recharge' | 'withdraw'>('recharge');
  const [rechargeAmount, setRechargeAmount] = useState('100');
  const [rechargeMethod, setRechargeMethod] = useState('USDT-TRC20');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const usdtAddress = 'TQn9Y2kh5M4yM7j7xL8aBcDeFgHiJkLmNo';

  const handleRechargeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(rechargeAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid recharge amount');
      return;
    }

    const newRecord: RechargeRecord = {
      id: 'rec_' + Math.random().toString(36).substr(2, 9),
      amount: amountNum,
      method: rechargeMethod,
      txid: '0x' + Math.random().toString(16).substr(2, 24),
      status: 'success',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedUser: User = {
      ...user,
      balance: user.balance + amountNum,
      rechargeHistory: [newRecord, ...user.rechargeHistory]
    };

    onUpdateUser(updatedUser);
    setMessage(`Successfully recharged $${amountNum.toFixed(2)} via ${rechargeMethod}!`);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid withdrawal amount');
      return;
    }
    if (amountNum > user.balance) {
      alert('Insufficient balance for this withdrawal amount');
      return;
    }
    if (!withdrawAddress.trim()) {
      alert('Please enter your destination wallet address');
      return;
    }

    const newRecord: WithdrawalRecord = {
      id: 'wit_' + Math.random().toString(36).substr(2, 9),
      amount: amountNum,
      address: withdrawAddress.trim(),
      status: 'approved',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedUser: User = {
      ...user,
      balance: user.balance - amountNum,
      withdrawalHistory: [newRecord, ...user.withdrawalHistory]
    };

    onUpdateUser(updatedUser);
    setWithdrawAmount('');
    setWithdrawAddress('');
    setWithdrawPassword('');
    setMessage(`Withdrawal request of $${amountNum.toFixed(2)} submitted successfully!`);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold backdrop-blur-sm">
            <Wallet className="w-3.5 h-3.5" />
            <span>Secure Financial Center</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Instant Recharge & Withdrawal</h2>
          <p className="text-xs opacity-90">
            Automated cryptocurrency and bank processing with 24/7 settlement and zero network fees.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/15 min-w-[180px]">
          <span className="text-[11px] font-semibold opacity-85">Available Balance</span>
          <div className="text-2xl font-black font-mono mt-0.5 text-amber-300">
            ${user.balance.toFixed(2)}
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3">
          <Check className="w-5 h-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-900 rounded-xl p-1">
        <button
          onClick={() => setSubTab('recharge')}
          className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${subTab === 'recharge' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          <ArrowDownLeft className="w-4 h-4" />
          <span>Deposit / Recharge</span>
        </button>
        <button
          onClick={() => setSubTab('withdraw')}
          className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${subTab === 'withdraw' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Withdraw Funds</span>
        </button>
      </div>

      {subTab === 'recharge' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recharge Form */}
          <form onSubmit={handleRechargeSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4 text-amber-400" />
              <span>Select Recharge Channel</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {['USDT-TRC20', 'USDT-ERC20', 'Bank Transfer', 'Pix / Crypto'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setRechargeMethod(method)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${rechargeMethod === method ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-medium text-slate-300">Recharge Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {['50', '100', '300', '1000', '5000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setRechargeAmount(amt)}
                  className="flex-1 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 hover:border-amber-500 transition-colors"
                >
                  ${amt}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm mt-4"
            >
              Confirm Instant Recharge
            </button>
          </form>

          {/* Deposit QR Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>USDT-TRC20 Deposit Address</span>
              </h3>
              <p className="text-xs text-slate-400">
                Send only USDT to this address. Deposits are credited automatically within 1–3 network block confirmations.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-amber-400 break-all">{usdtAddress}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(usdtAddress);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Minimum deposit amount is $50. Do not send non-USDT assets to this address.</span>
            </div>
          </div>
        </div>
      ) : (
        /* Withdrawal Form */
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
            <span>Withdraw Funds to External Wallet</span>
          </h3>

          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Withdrawal Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">Available Balance: <span className="text-amber-400 font-mono">${user.balance.toFixed(2)}</span></p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Destination Wallet Address (USDT-TRC20)</label>
              <input
                type="text"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                placeholder="Enter TRC20 wallet address"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Fund Password</label>
              <input
                type="password"
                value={withdrawPassword}
                onChange={(e) => setWithdrawPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all text-sm mt-2"
            >
              Submit Withdrawal Request
            </button>
          </form>
        </div>
      )}

      {/* Financial Transaction Records */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Recharge & Withdrawal History</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recharge Records</h4>
            <div className="space-y-2">
              {user.rechargeHistory.map((rec) => (
                <div key={rec.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-white">+${rec.amount.toFixed(2)} ({rec.method})</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{rec.timestamp}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-sans font-semibold">
                    Success
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Withdrawal Records</h4>
            <div className="space-y-2">
              {user.withdrawalHistory.map((wit) => (
                <div key={wit.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-white">-${wit.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{wit.timestamp}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-sans font-semibold">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
