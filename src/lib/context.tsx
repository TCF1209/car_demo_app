"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { Language, CartItem, Product, Transaction, User, ServicePackage, PurchasedPackage, RedemptionItem } from "@/types";
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
  cartPackages: ServicePackage[];
  addPackageToCart: (pkg: ServicePackage) => void;
  removePackageFromCart: (pkgId: string) => void;
  redeemPoints: (item: RedemptionItem) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [user, setUser] = useState<User>({ ...initialUser });
  const [transactions, setTransactions] = useState<Transaction[]>([...initialTransactions]);
  const [purchasedPackages, setPurchasedPackages] = useState<PurchasedPackage[]>([]);
  const [cartPackages, setCartPackages] = useState<ServicePackage[]>([]);

  const addPackageToCart = useCallback((pkg: ServicePackage) => {
    setCartPackages((prev) => {
      if (prev.find((p) => p.id === pkg.id)) return prev;
      return [...prev, pkg];
    });
  }, []);

  const removePackageFromCart = useCallback((pkgId: string) => {
    setCartPackages((prev) => prev.filter((p) => p.id !== pkgId));
  }, []);

  const packagesTotal = cartPackages.reduce((sum, pkg) => sum + pkg.price, 0);
  const combinedTotal = totalPrice + packagesTotal;
  const combinedItems = totalItems + cartPackages.length;

  const placeOrder = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    // Points: RM1 = 1pt for products, bonus points for packages
    const productPoints = Math.floor(totalPrice);
    const packagePoints = cartPackages.reduce((sum, pkg) => sum + pkg.bonusPoints, 0);
    const totalPointsEarned = productPoints + packagePoints;

    // Build transaction items from products
    const txItems = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price * item.quantity,
    }));

    // Add package items
    cartPackages.forEach((pkg) => {
      txItems.push({
        name: pkg.name,
        quantity: 1,
        price: pkg.price,
      });
    });

    if (txItems.length > 0) {
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        date: today,
        items: txItems,
        total: combinedTotal,
        pointsEarned: totalPointsEarned,
        type: cartPackages.length > 0 && items.length === 0 ? "package" : "order",
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }

    // Activate purchased packages
    cartPackages.forEach((pkg) => {
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
    });

    setUser((prev) => ({
      ...prev,
      points: prev.points + totalPointsEarned,
      totalSpent: prev.totalSpent + combinedTotal,
    }));

    clearCart();
    setCartPackages([]);

    return totalPointsEarned;
  }, [items, totalPrice, cartPackages, combinedTotal, clearCart]);

  const redeemPoints = useCallback((item: RedemptionItem) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points - item.points,
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
        totalItems: combinedItems,
        totalPrice: combinedTotal,
        user,
        transactions,
        placeOrder,
        purchasedPackages,
        cartPackages,
        addPackageToCart,
        removePackageFromCart,
        redeemPoints,
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
