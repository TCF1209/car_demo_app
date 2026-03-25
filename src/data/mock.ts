import { User, Product, RedemptionItem, Transaction, ServicePackage } from "@/types";

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

export const servicePackages: ServicePackage[] = [
  {
    id: "pkg1",
    name: { en: "Essential Care", zh: "基础护理套餐" },
    description: {
      en: "Perfect for regular maintenance — keep your car running smooth",
      zh: "适合日常保养，让您的爱车保持最佳状态",
    },
    price: 388,
    originalPrice: 495,
    color: "from-blue-500 to-blue-600",
    icon: "Shield",
    includes: [
      { name: { en: "Oil Change (Castrol 5W-40)", zh: "换机油 (Castrol 5W-40)" }, quantity: 3 },
      { name: { en: "Car Wash", zh: "洗车" }, quantity: 3 },
      { name: { en: "20-Point Inspection", zh: "20项检查" }, quantity: 3 },
    ],
    bonusPoints: 500,
  },
  {
    id: "pkg2",
    name: { en: "Full Protection", zh: "全面保护套餐" },
    description: {
      en: "Our most popular bundle — comprehensive care at great value",
      zh: "最受欢迎的套餐——全面护理，超值之选",
    },
    price: 988,
    originalPrice: 1390,
    color: "from-primary to-orange-600",
    icon: "ShieldCheck",
    includes: [
      { name: { en: "Full Service", zh: "全面保养" }, quantity: 4 },
      { name: { en: "Car Wash", zh: "洗车" }, quantity: 6 },
      { name: { en: "AC Service & Gas Top-Up", zh: "空调保养及加冷气" }, quantity: 2 },
      { name: { en: "Tyre Rotation + Balancing", zh: "轮胎换位 + 平衡" }, quantity: 2 },
    ],
    bonusPoints: 1200,
  },
  {
    id: "pkg3",
    name: { en: "Ultimate", zh: "尊享套餐" },
    description: {
      en: "The complete package — everything your car needs for the whole year",
      zh: "一年无忧——涵盖爱车所需的全部服务",
    },
    price: 1688,
    originalPrice: 2480,
    color: "from-violet-600 to-purple-700",
    icon: "Crown",
    includes: [
      { name: { en: "Full Service", zh: "全面保养" }, quantity: 4 },
      { name: { en: "Car Wash", zh: "洗车" }, quantity: 12 },
      { name: { en: "AC Service & Gas Top-Up", zh: "空调保养及加冷气" }, quantity: 2 },
      { name: { en: "Battery Replacement", zh: "更换电池" }, quantity: 1 },
      { name: { en: "Brake Pads Replacement", zh: "更换刹车片" }, quantity: 1 },
      { name: { en: "Tyre Rotation + Balancing", zh: "轮胎换位 + 平衡" }, quantity: 4 },
    ],
    bonusPoints: 2000,
  },
];
