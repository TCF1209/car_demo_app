"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { Language, CartItem, Product, Transaction, User } from "@/types";
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
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [user, setUser] = useState<User>({ ...initialUser });
  const [transactions, setTransactions] = useState<Transaction[]>([...initialTransactions]);

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
