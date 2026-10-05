import { VipTier } from '../types';

export const VIP_TIERS: VipTier[] = [
  {
    level: 0,
    name: 'VIP 0 - Trial Experience',
    price: 0,
    dailyTasks: 5,
    commissionRate: 0.003, // 0.3%
    minBalance: 0,
    description: 'Free trial experience for new members to explore order grabbing.'
  },
  {
    level: 1,
    name: 'VIP 1 - Bronze Merchant',
    price: 50,
    dailyTasks: 15,
    commissionRate: 0.0045, // 0.45%
    minBalance: 50,
    description: 'Standard merchant tier with 15 daily orders and optimized commission.'
  },
  {
    level: 2,
    name: 'VIP 2 - Silver Merchant',
    price: 300,
    dailyTasks: 20,
    commissionRate: 0.006, // 0.6%
    minBalance: 300,
    description: 'Higher yield orders with priority matching and 20 daily tasks.'
  },
  {
    level: 3,
    name: 'VIP 3 - Gold Merchant',
    price: 1000,
    dailyTasks: 25,
    commissionRate: 0.0075, // 0.75%
    minBalance: 1000,
    description: 'Professional tier for high-volume cross-border e-commerce promotion.'
  },
  {
    level: 4,
    name: 'VIP 4 - Platinum Partner',
    price: 3000,
    dailyTasks: 30,
    commissionRate: 0.009, // 0.9%
    minBalance: 3000,
    description: 'Exclusive partnership tier with luxury brand matching and top returns.'
  },
  {
    level: 5,
    name: 'VIP 5 - Diamond Global Director',
    price: 10000,
    dailyTasks: 40,
    commissionRate: 0.012, // 1.2%
    minBalance: 10000,
    description: 'Ultimate director tier with maximum commission rate and 40 daily orders.'
  }
];

export const MOCK_PRODUCTS = [
  { name: 'Apple iPhone 17 Pro Max 512GB Natural Titanium', price: 1299.00, platform: 'Amazon' as const, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', price: 399.00, platform: 'Amazon' as const, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
  { name: 'MacBook Pro 16" M3 Max 32GB RAM 1TB SSD', price: 3499.00, platform: 'Lazada' as const, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { name: 'DJI Mavic 4 Pro Fly More Combo Drone with RC 2', price: 1599.00, platform: 'Shopee' as const, image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80' },
  { name: 'Nintendo Switch OLED Model Mario Red Edition', price: 349.00, platform: 'AliExpress' as const, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ergonomic Executive Office Chair with Lumbar Support', price: 450.00, platform: 'eBay' as const, image: 'https://images.unsplash.com/photo-1580481077494-e3299ac25e94?auto=format&fit=crop&w=600&q=80' },
  { name: 'Canon EOS R5 Mirrorless Camera Body 45MP', price: 3899.00, platform: 'Amazon' as const, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
  { name: 'Samsung 49" Odyssey OLED G9 Curved Gaming Monitor', price: 1399.00, platform: 'Shopee' as const, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
];

export const ANNOUNCEMENTS = [
  '🎉 Congratulations user ***4821 for successfully upgrading to VIP 3 and earning $450 in daily commissions!',
  '📢 DMFirst Global Partnership Program update: Invite Level 1 friends to earn up to 10% cash bonus instantly.',
  '⚡ USDT-TRC20 instant deposit & withdrawal channel is fully operational with 0% network fee.',
  '🌟 Daily task reset takes place at 00:00 UTC time. Complete your quota today to maximize earnings!'
];
