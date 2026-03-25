"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { lang, cartItems, cartPackages, updateQuantity, removeItem, removePackageFromCart, totalPrice } = useApp();

  const hasItems = cartItems.length > 0 || cartPackages.length > 0;

  if (!hasItems) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag size={36} className="text-gray-300" />
        </div>
        <h2 className="font-display text-lg font-bold text-gray-800">
          {t.emptyCart[lang]}
        </h2>
        <p className="mt-1 text-sm text-gray-400">{t.emptyCartDesc[lang]}</p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 active:scale-95"
        >
          {t.continueShopping[lang]}
        </Link>
      </motion.div>
    );
  }

  const productTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const productPoints = Math.floor(productTotal);
  const packagePoints = cartPackages.reduce((sum, pkg) => sum + pkg.bonusPoints, 0);
  const totalPoints = productPoints + packagePoints;

  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 font-display text-xl font-bold text-gray-900">
        {t.cart[lang]}
      </h1>

      {/* Product Items */}
      <AnimatePresence mode="popLayout">
        {cartItems.map((item) => (
          <motion.div
            key={item.product.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-3 flex items-center gap-3 rounded-2xl bg-secondary p-3"
          >
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gray-200/60">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {item.product.name[lang]}
              </p>
              <p className="text-sm font-bold text-primary">
                {formatPrice(item.product.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary active:scale-90"
              >
                <Plus size={14} />
              </button>
              <button
                onClick={() => removeItem(item.product.id)}
                className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-red-400 hover:bg-red-50 active:scale-90"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Package Items */}
      <AnimatePresence mode="popLayout">
        {cartPackages.map((pkg) => {
          const IconComp = getIcon(pkg.icon);
          return (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-3 flex items-center gap-3 rounded-2xl bg-secondary p-3"
            >
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: pkg.color }}
              >
                <IconComp size={24} className="text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {pkg.name[lang]}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {t.packages[lang]}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removePackageFromCart(pkg.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-red-400 hover:bg-red-50 active:scale-90"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Summary */}
      <div className="mt-4 rounded-2xl bg-secondary p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{t.subtotal[lang]}</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{t.tax[lang]}</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
            <Sparkles size={12} />
            {t.earnPoints[lang]} +{totalPoints} {t.pts[lang]}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-900">
          <span>{t.total[lang]}</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-4 block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]"
      >
        {t.proceedToCheckout[lang]}
      </Link>
    </div>
  );
}
