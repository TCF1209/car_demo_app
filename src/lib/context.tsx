"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { Language, CartItem, Product } from "@/types";

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
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLanguage();
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

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
