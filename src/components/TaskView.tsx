import React, { useState } from 'react';
import { User, VipTier, TaskRecord } from '../types';
import { VIP_TIERS, MOCK_PRODUCTS } from '../data/mockData';
import { Zap, Award, CheckCircle2, Loader2, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface TaskViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const TaskView: React.FC<TaskViewProps> = ({ user, onUpdateUser }) => {
  const [grabbing, setGrabbing] = useState(false);
  const [activeOrder, setActiveOrder] = useState<{
    productName: string;
    productImage: string;
    price: number;
    commission: number;
    platform: 'Amazon' | 'Shopee' | 'Lazada' | 'AliExpress' | 'eBay';
  } | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const currentVip = VIP_TIERS[user.vipLevel] || VIP_TIERS[1];

  const handleStartGrabbing = () => {
    if (user.completedTasksToday >= user.maxTasksToday) {
      alert('You have completed your daily task quota. Please come back tomorrow!');
      return;
    }

    setGrabbing(true);
    setSuccessMessage('');

    setTimeout(() => {
      // Pick random product
      const randomProd = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
      // Calculate order amount based on user balance / VIP tier
      const orderPrice = Math.min(user.balance * 0.8, randomProd.price);
      const commission = orderPrice * currentVip.commissionRate;

      setActiveOrder({
        productName: randomProd.name,
        productImage: randomProd.image,
        price: orderPrice,
        commission: commission,
        platform: randomProd.platform
      });
      setGrabbing(false);
    }, 1500);
  };

  const handleSubmitOrder = () => {
    if (!activeOrder) return;

    const newBalance = user.balance + activeOrder.commission;
    const newTodayEarnings = user.todayEarnings + activeOrder.commission;
    const newTotalEarnings = user.totalEarnings + activeOrder.commission;
    const newCompleted = user.completedTasksToday + 1;

    const newTaskRecord: TaskRecord = {
      id: 'task_' + Math.random().toString(36).substr(2, 9),
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      productName: activeOrder.productName,
      productImage: activeOrder.productImage,
      price: activeOrder.price,
      commission: activeOrder.commission,
      platform: activeOrder.platform,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedUser: User = {
      ...user,
      balance: newBalance,
      todayEarnings: newTodayEarnings,
      totalEarnings: newTotalEarnings,
      completedTasksToday: newCompleted,
      taskHistory: [newTaskRecord, ...user.taskHistory]
    };

    onUpdateUser(updatedUser);
    setActiveOrder(null);
    setSuccessMessage(`Successfully earned +$${activeOrder.commission.toFixed(2)} commission!`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleUpgradeVip = (tier: VipTier) => {
    if (user.balance < tier.price) {
      alert(`Insufficient balance to upgrade to ${tier.name}. Please recharge first.`);
      return;
    }
    if (confirm(`Confirm upgrade to ${tier.name} for $${tier.price}?`)) {
      const updatedUser: User = {
        ...user,
        balance: user.balance - tier.price,
        vipLevel: tier.level,
        maxTasksToday: tier.dailyTasks
      };
      onUpdateUser(updatedUser);
      alert(`Congratulations! You have successfully upgraded to ${tier.name}.`);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 rounded-2xl p-6 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/20 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Task Hall & Order Grabbing</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">{currentVip.name}</h2>
          <p className="text-xs opacity-90">
            Commission Rate: <span className="font-bold">{(currentVip.commissionRate * 100).toFixed(2)}%</span> per order · Daily Quota: {user.completedTasksToday}/{user.maxTasksToday}
          </p>
        </div>

        <div className="bg-slate-950/15 backdrop-blur-sm rounded-xl p-4 text-center border border-slate-950/10">
          <span className="text-[11px] font-semibold opacity-85">Today's Commission</span>
          <div className="text-2xl font-black font-mono mt-0.5">${user.todayEarnings.toFixed(2)}</div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Order Grabbing Action Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
          {grabbing ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : (
            <ShoppingBag className="w-10 h-10" />
          )}
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white">
            {grabbing ? 'Matching Merchant Order...' : 'Ready to Grab Order'}
          </h3>
          <p className="text-xs text-slate-400">
            Click the button below to match with global e-commerce orders, boost merchant rankings, and collect instant commission.
          </p>
        </div>

        <button
          onClick={handleStartGrabbing}
          disabled={grabbing || user.completedTasksToday >= user.maxTasksToday}
          className={`py-4 px-8 rounded-xl font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 mx-auto transition-all ${
            user.completedTasksToday >= user.maxTasksToday
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/25 hover:scale-105'
          }`}
        >
          {grabbing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Matching Order...</span>
            </>
          ) : user.completedTasksToday >= user.maxTasksToday ? (
            <span>Daily Quota Completed (Come Back Tomorrow)</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Start Grabbing Orders ({user.maxTasksToday - user.completedTasksToday} left)</span>
            </>
          )}
        </button>
      </div>

      {/* Active Order Submission Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-4 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10">
                {activeOrder.platform} Order Matched
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <img
                  src={activeOrder.productImage}
                  alt={activeOrder.productName}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-800"
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-2">{activeOrder.productName}</h4>
                  <div className="text-xs text-slate-400 font-mono">Price: ${activeOrder.price.toFixed(2)}</div>
                  <div className="text-xs text-amber-400 font-mono font-bold">Estimated Commission: +${activeOrder.commission.toFixed(2)}</div>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Submit Order & Collect Commission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIP Tiers Upgrade List */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>VIP Upgrade Tiers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VIP_TIERS.map((tier) => {
            const isCurrent = user.vipLevel === tier.level;
            return (
              <div
                key={tier.level}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-500/5 border-amber-500/50 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                      VIP {tier.level}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      {tier.price === 0 ? 'Free Trial' : `$${tier.price} Upgrade`}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{tier.name}</h4>
                  <p className="text-xs text-slate-400">{tier.description}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Daily Orders</span>
                      <span className="font-bold text-white font-mono">{tier.dailyTasks} Tasks</span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Commission Rate</span>
                      <span className="font-bold text-amber-400 font-mono">{(tier.commissionRate * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Min Balance: <strong className="text-white">${tier.minBalance}</strong></span>
                  {isCurrent ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      Current Tier
                    </span>
                  ) : tier.level === 0 ? (
                    <span className="text-xs text-slate-500">Trial Tier</span>
                  ) : (
                    <button
                      onClick={() => handleUpgradeVip(tier)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                    >
                      Upgrade Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
