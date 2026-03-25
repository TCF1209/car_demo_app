"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { Language, CartItem, Product, Transaction, User, ServicePackage, PurchasedPackage } from "@/types";
import { mockUser as initialUser, transactions as initialTransactions } from "@/data/mock";

interface AppContextType {
  lang: Language;
  toggleLang: () => void;
  cartItems: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  user: User;
  transactions: Transaction[];
  placeOrder: () => number;
  purchasedPackages: PurchasedPackage[];
  purchasePackage: (pkg: ServicePackage) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [user, setUser] = useState<User>({ ...initialUser });
  const [transactions, setTransactions] = useState<Transaction[]>([...initialTransactions]);
  const [purchasedPackages, setPurchasedPackages] = useState<PurchasedPackage[]>([]);

  const placeOrder = useCallback(() => {
    const pointsEarned = Math.floor(totalPrice);
    const today = new Date().toISOString().split("T")[0];

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: today,
      items: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
      })),
      total: totalPrice,
      pointsEarned,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setUser((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalSpent: prev.totalSpent + totalPrice,
    }));
    clearCart();

    return pointsEarned;
  }, [items, totalPrice, clearCart]);

  const purchasePackage = useCallback((pkg: ServicePackage) => {
    const today = new Date().toISOString().split("T")[0];

    const purchased: PurchasedPackage = {
      pkg,
      purchaseDate: today,
      remaining: pkg.includes.map((item) => ({
        name: item.name,
        total: item.quantity,
        used: 0,
      })),
    };

    setPurchasedPackages((prev) => [purchased, ...prev]);

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: today,
      items: pkg.includes.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: 0,
      })),
      total: pkg.price,
      pointsEarned: pkg.bonusPoints,
      type: "package",
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setUser((prev) => ({
      ...prev,
      points: prev.points + pkg.bonusPoints,
      totalSpent: prev.totalSpent + pkg.price,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        toggleLang,
        cartItems: items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        user,
        transactions,
        placeOrder,
        purchasedPackages,
        purchasePackage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
