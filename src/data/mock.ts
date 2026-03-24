import { User, Product, RedemptionItem, Transaction } from "@/types";

export const mockUser: User = {
  name: "Ahmad Razif",
  phone: "012-3456789",
  points: 1250,
  totalSpent: 1250.0,
  memberSince: "January 2024",
};

export const products: Product[] = [
  {
    id: "p1",
    name: { en: "Engine Oil (Castrol 5W-40)", zh: "机油 (Castrol 5W-40)" },
    description: {
      en: "Premium fully synthetic engine oil for optimal engine protection",
      zh: "优质全合成机油，提供最佳引擎保护",
    },
    price: 85,
    category: "parts",
    icon: "Droplets",
  },
  {
    id: "p2",
    name: { en: "Air Filter", zh: "空气滤清器" },
    description: {
      en: "High-quality air filter for cleaner engine performance",
      zh: "高品质空气滤清器，提升引擎表现",
    },
    price: 45,
    category: "parts",
    icon: "Wind",
  },
  {
    id: "p3",
    name: { en: "Wiper Blades (Pair)", zh: "雨刷片（一对）" },
    description: {
      en: "Durable silicone wiper blades for streak-free visibility",
      zh: "耐用硅胶雨刷片，确保视野清晰无痕",
    },
    price: 38,
    category: "parts",
    icon: "Waves",
  },
  {
    id: "p4",
    name: { en: "Brake Pads (Front Set)", zh: "刹车片（前组）" },
    description: {
      en: "Reliable ceramic brake pads for safe braking",
      zh: "可靠的陶瓷刹车片，确保安全制动",
    },
    price: 120,
    category: "parts",
    icon: "CircleDot",
  },
  {
    id: "p5",
    name: { en: "Car Battery (Amaron 55B24L)", zh: "汽车电池 (Amaron 55B24L)" },
    description: {
      en: "Long-lasting maintenance-free battery with 24-month warranty",
      zh: "免维护长效电池，24个月保修",
    },
    price: 280,
    category: "parts",
    icon: "Battery",
  },
  {
    id: "s1",
    name: { en: "Basic Service Package", zh: "基本保养套餐" },
    description: {
      en: "Oil change + filter replacement + 20-point inspection",
      zh: "换机油 + 更换滤清器 + 20项检查",
    },
    price: 150,
    category: "services",
    icon: "Wrench",
  },
  {
    id: "s2",
    name: { en: "Full Service Package", zh: "全面保养套餐" },
    description: {
      en: "Comprehensive service including all fluids, filters, and full inspection",
      zh: "全面保养，包括所有液体、滤清器及完整检查",
    },
    price: 350,
    category: "services",
    icon: "Settings",
  },
  {
    id: "s3",
    name: { en: "AC Service & Gas Top-Up", zh: "空调保养及加冷气" },
    description: {
      en: "Air-conditioning service with refrigerant gas top-up",
      zh: "空调维修保养及冷气加注",
    },
    price: 180,
    category: "services",
    icon: "Snowflake",
  },
  {
    id: "s4",
    name: { en: "Tyre Rotation + Balancing", zh: "轮胎换位 + 平衡" },
    description: {
      en: "Extend tyre life with professional rotation and balancing",
      zh: "专业轮胎换位与平衡，延长轮胎寿命",
    },
    price: 80,
    category: "services",
    icon: "Circle",
  },
];

export const redemptionItems: RedemptionItem[] = [
  {
    id: "r1",
    name: { en: "Free Car Wash", zh: "免费洗车" },
    points: 200,
    icon: "Sparkles",
  },
  {
    id: "r2",
    name: { en: "Engine Oil Top-Up", zh: "免费添加机油" },
    points: 500,
    icon: "Droplets",
  },
  {
    id: "r3",
    name: { en: "RM10 Voucher", zh: "RM10 优惠券" },
    points: 300,
    icon: "Ticket",
  },
  {
    id: "r4",
    name: { en: "Free Wiper Replacement", zh: "免费更换雨刷" },
    points: 400,
    icon: "Waves",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    date: "2026-03-10",
    items: [
      { name: { en: "Basic Service Package", zh: "基本保养套餐" }, quantity: 1, price: 150 },
      { name: { en: "Air Filter", zh: "空气滤清器" }, quantity: 1, price: 45 },
    ],
    total: 195,
    pointsEarned: 195,
  },
  {
    id: "t2",
    date: "2026-02-14",
    items: [
      { name: { en: "Engine Oil (Castrol 5W-40)", zh: "机油 (Castrol 5W-40)" }, quantity: 2, price: 170 },
      { name: { en: "Wiper Blades (Pair)", zh: "雨刷片（一对）" }, quantity: 1, price: 38 },
    ],
    total: 208,
    pointsEarned: 208,
  },
  {
    id: "t3",
    date: "2026-01-18",
    items: [
      { name: { en: "Full Service Package", zh: "全面保养套餐" }, quantity: 1, price: 350 },
    ],
    total: 350,
    pointsEarned: 350,
  },
  {
    id: "t4",
    date: "2025-12-05",
    items: [
      { name: { en: "Car Battery (Amaron 55B24L)", zh: "汽车电池 (Amaron 55B24L)" }, quantity: 1, price: 280 },
      { name: { en: "AC Service & Gas Top-Up", zh: "空调保养及加冷气" }, quantity: 1, price: 180 },
    ],
    total: 460,
    pointsEarned: 460,
  },
];
