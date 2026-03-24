export type Language = "en" | "zh";

export interface User {
  name: string;
  phone: string;
  points: number;
  totalSpent: number;
  memberSince: string;
}

export type ProductCategory = "parts" | "services";

export interface Product {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  price: number;
  category: ProductCategory;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RedemptionItem {
  id: string;
  name: { en: string; zh: string };
  points: number;
  icon: string;
}

export interface Transaction {
  id: string;
  date: string;
  items: { name: { en: string; zh: string }; quantity: number; price: number }[];
  total: number;
  pointsEarned: number;
}
