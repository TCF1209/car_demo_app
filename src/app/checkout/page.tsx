"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Building2, Smartphone, PartyPopper, ShoppingBag } from "lucide-react";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { formatPrice } from "@/lib/utils";

const paymentMethods = [
  { id: "card", icon: CreditCard, label: t.creditCard },
  { id: "banking", icon: Building2, label: t.onlineBanking },
  { id: "ewallet", icon: Smartphone, label: t.eWallet },
];

export default function CheckoutPage() {
  const { lang, cartItems, totalPrice, placeOrder } = useApp();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  if (cartItems.length === 0 && !showSuccess) {
    router.push("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    const pts = placeOrder();
    setEarnedPoints(pts);
    setShowSuccess(true);
  };

  return (
    <div className="px-4 py-4">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <PartyPopper size={36} className="text-green-600" />
            </div>
            <h2 className="font-display text-xl font-bold text-gray-900">
              {t.orderSuccess[lang]}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {t.pointsEarned[lang]}{" "}
              <span className="font-bold text-primary">{earnedPoints}</span>{" "}
              {t.pointsUnit[lang]} 🎉
            </p>
            <Link
              href="/"
              className="mt-8 rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 active:scale-95"
            >
              {t.backToHome[lang]}
            </Link>
          </motion.div>
        ) : (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-4 font-display text-xl font-bold text-gray-900">
              {t.checkout[lang]}
            </h1>

            {/* Order Summary */}
            <div className="mb-4 rounded-2xl bg-secondary p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                {t.orderSummary[lang]}
              </h3>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between py-1.5 text-sm text-gray-600"
                >
                  <span className="truncate pr-2">
                    {item.product.name[lang]} × {item.quantity}
                  </span>
                  <span className="flex-shrink-0 font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="mt-2 border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-900">
                <span>{t.total[lang]}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                {t.paymentMethod[lang]}
              </h3>
              <div className="space-y-2">
                {paymentMethods.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-colors ${
                      selectedPayment === id
                        ? "border-primary bg-primary/5"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <Icon
                      size={20}
                      className={selectedPayment === id ? "text-primary" : "text-gray-400"}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedPayment === id ? "text-primary" : "text-gray-600"
                      }`}
                    >
                      {label[lang]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]"
            >
              {t.placeOrder[lang]}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
