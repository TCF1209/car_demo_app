"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Info, Wrench } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { mockUser, redemptionItems, transactions } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { RedemptionItem } from "@/types";

export default function PointsPage() {
  const { lang } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RedemptionItem | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = (item: RedemptionItem) => {
    setSelectedItem(item);
    setRedeemed(false);
    setShowModal(true);
  };

  const confirmRedeem = () => {
    setRedeemed(true);
    setTimeout(() => setShowModal(false), 1500);
  };

  return (
    <div className="px-4 py-4">
      {/* Points Balance */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 text-white shadow-lg shadow-primary/25"
      >
        <p className="text-sm font-medium opacity-90">{t.yourPoints[lang]}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold">{mockUser.points.toLocaleString()}</span>
          <Star size={20} className="opacity-80" fill="currentColor" />
        </div>
        <p className="mt-1 text-xs opacity-75">{mockUser.name}</p>
      </motion.div>

      {/* How It Works */}
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary/5 p-3">
        <Info size={16} className="mt-0.5 flex-shrink-0 text-primary" />
        <div>
          <p className="text-xs font-semibold text-gray-700">{t.howItWorks[lang]}</p>
          <p className="text-[11px] text-gray-500">{t.howItWorksDesc[lang]}</p>
        </div>
      </div>

      {/* Redeem Rewards */}
      <h2 className="mt-6 mb-3 font-display text-lg font-bold text-gray-900">
        {t.redeemRewards[lang]}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {redemptionItems.map((item, i) => {
          const IconComp = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[item.icon] || Wrench;
          const canRedeem = mockUser.points >= item.points;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex flex-col items-center rounded-2xl bg-secondary p-4 text-center"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <IconComp size={20} className="text-primary" />
              </div>
              <span className="text-xs font-semibold text-gray-800">{item.name[lang]}</span>
              <span className="mt-0.5 text-xs text-gray-400">
                {item.points} {t.pts[lang]}
              </span>
              <button
                onClick={() => handleRedeem(item)}
                disabled={!canRedeem}
                className={`mt-2 w-full rounded-lg py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  canRedeem
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {canRedeem ? t.redeem[lang] : t.notEnoughPoints[lang]}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Transaction History */}
      <h2 className="mt-6 mb-3 font-display text-lg font-bold text-gray-900">
        {t.transactionHistory[lang]}
      </h2>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="rounded-2xl bg-secondary p-4">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{tx.date}</span>
              <span className="font-semibold text-green-600">
                +{tx.pointsEarned} {t.pts[lang]}
              </span>
            </div>
            {tx.items.map((item, j) => (
              <p key={j} className="mt-1 text-sm text-gray-700">
                {item.name[lang]} × {item.quantity}
              </p>
            ))}
            <p className="mt-1 text-sm font-bold text-gray-900">{formatPrice(tx.total)}</p>
          </div>
        ))}
      </div>

      {/* Redeem Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
            onClick={() => !redeemed && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
            >
              {redeemed ? (
                <>
                  <div className="mb-3 text-4xl">🎉</div>
                  <p className="font-display text-lg font-bold text-gray-900">{t.redeemed[lang]}</p>
                </>
              ) : (
                <>
                  <p className="font-display text-lg font-bold text-gray-900">
                    {t.confirmRedeem[lang]}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {t.redeemConfirmMsg[lang]}{" "}
                    <span className="font-semibold text-gray-800">{selectedItem.name[lang]}</span>{" "}
                    {t.redeemFor[lang]}{" "}
                    <span className="font-bold text-primary">{selectedItem.points} {t.pts[lang]}</span>?
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-500"
                    >
                      {t.cancel[lang]}
                    </button>
                    <button
                      onClick={confirmRedeem}
                      className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-white active:scale-95"
                    >
                      {t.confirm[lang]}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
