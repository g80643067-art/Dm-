export type TabType = 'home' | 'tasks' | 'team' | 'finance' | 'profile';

export interface User {
  id: string;
  username: string;
  phone: string;
  balance: number;
  frozenBalance: number;
  todayEarnings: number;
  totalEarnings: number;
  vipLevel: number; // 0 to 5
  completedTasksToday: number;
  maxTasksToday: number;
  inviteCode: string;
  rechargeHistory: RechargeRecord[];
  withdrawalHistory: WithdrawalRecord[];
  taskHistory: TaskRecord[];
  teamStats: {
    level1Count: number;
    level2Count: number;
    level3Count: number;
    level1Commission: number;
    level2Commission: number;
    level3Commission: number;
    totalTeamBalance: number;
  };
}

export interface RechargeRecord {
  id: string;
  amount: number;
  method: string;
  txid: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface TaskRecord {
  id: string;
  orderNumber: string;
  productName: string;
  productImage: string;
  price: number;
  commission: number;
  platform: 'Amazon' | 'Shopee' | 'Lazada' | 'AliExpress' | 'eBay';
  status: 'completed' | 'processing';
  timestamp: string;
}

export interface VipTier {
  level: number;
  name: string;
  price: number;
  dailyTasks: number;
  commissionRate: number; // e.g. 0.0045 (0.45%)
  minBalance: number;
  description: string;
}
