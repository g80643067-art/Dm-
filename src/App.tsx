import React, { useState, useEffect } from 'react';
import { TabType, User } from './types';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { TaskView } from './components/TaskView';
import { TeamView } from './components/TeamView';
import { FinanceView } from './components/FinanceView';
import { ProfileView } from './components/ProfileView';
import { SupportModal } from './components/SupportModal';
import { IntroSplash } from './components/IntroSplash';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dmfirst_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default logged-in demo user for instant amazing experience
    return {
      id: 'user_dm9981',
      username: 'DemoTrader',
      phone: '+1 555-0199',
      balance: 1280.50,
      frozenBalance: 0,
      todayEarnings: 45.20,
      totalEarnings: 840.60,
      vipLevel: 2,
      completedTasksToday: 12,
      maxTasksToday: 20,
      inviteCode: 'DM8888',
      rechargeHistory: [
        { id: 'rec_1', amount: 500, method: 'USDT-TRC20', txid: '0x9a8f...4c21', status: 'success', timestamp: '2026-09-29 14:20' }
      ],
      withdrawalHistory: [
        { id: 'wit_1', amount: 200, address: 'TQn9Y2kh...j7xL', status: 'approved', timestamp: '2026-09-28 10:15' }
      ],
      taskHistory: [
        {
          id: 'tsk_1',
          orderNumber: 'ORD-882941',
          productName: 'Apple iPhone 17 Pro Max 512GB Natural Titanium',
          productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
          price: 1299.00,
          commission: 7.79,
          platform: 'Amazon',
          status: 'completed',
          timestamp: '2026-09-30 03:10'
        }
      ],
      teamStats: {
        level1Count: 18,
        level2Count: 7,
        level3Count: 3,
        level1Commission: 245.50,
        level2Commission: 88.20,
        level3Commission: 24.00,
        totalTeamBalance: 18450.00
      }
    };
  });

  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [showSupport, setShowSupport] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dmfirst_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dmfirst_user');
    }
  }, [user]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('dmfirst_user');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (showIntro) {
    return <IntroSplash onEnter={() => setShowIntro(false)} />;
  }

  if (!user) {
    return <AuthModal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onLogout={handleLogout}
        onOpenSupport={() => setShowSupport(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {currentTab === 'home' && (
          <DashboardView
            user={user}
            setCurrentTab={setCurrentTab}
            onOpenSupport={() => setShowSupport(true)}
          />
        )}
        {currentTab === 'tasks' && (
          <TaskView
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        )}
        {currentTab === 'team' && (
          <TeamView
            user={user}
          />
        )}
        {currentTab === 'finance' && (
          <FinanceView
            user={user}
            onUpdateUser={handleUpdateUser}
          />
        )}
        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onLogout={handleLogout}
          />
        )}
      </main>

      {showSupport && (
        <SupportModal onClose={() => setShowSupport(false)} />
      )}
    </div>
  );
}
