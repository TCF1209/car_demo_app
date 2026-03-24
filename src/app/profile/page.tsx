"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Phone, Calendar, Wallet, Star, Globe, LogOut } from "lucide-react";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { formatPrice } from "@/lib/utils";

export default function ProfilePage() {
  const { lang, toggleLang, user, transactions } = useApp();
  const router = useRouter();

  return (
    <div className="px-4 py-4">
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <User size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">{user.name}</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Phone size={12} />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={12} />
          <span>
            {t.memberSince[lang]} {user.memberSince}
          </span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-secondary p-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Wallet size={14} />
            <span>{t.totalSpent[lang]}</span>
          </div>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">
            {formatPrice(user.totalSpent)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-secondary p-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Star size={14} />
            <span>{t.points[lang]}</span>
          </div>
          <p className="mt-1 font-display text-xl font-bold text-primary">
            {user.points.toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Order History */}
      <h2 className="mt-6 mb-3 font-display text-lg font-bold text-gray-900">
        {t.orderHistory[lang]}
      </h2>
      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl bg-secondary p-4"
          >
            <div className="flex justify-between text-xs text-gray-400">
              <span>{tx.date}</span>
              <span>
                {tx.items.length} {t.items[lang]}
              </span>
            </div>
            {tx.items.map((item, j) => (
              <p key={j} className="mt-1 text-sm text-gray-700">
                {item.name[lang]} × {item.quantity}
              </p>
            ))}
            <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
              <span className="text-sm font-bold text-gray-900">{formatPrice(tx.total)}</span>
              <span className="text-xs text-green-600 font-medium">
                +{tx.pointsEarned} {t.pts[lang]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-2">
        <button
          onClick={toggleLang}
          className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors hover:bg-gray-100"
        >
          <Globe size={20} className="text-gray-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">{t.language[lang]}</p>
            <p className="text-xs text-gray-400">{lang === "en" ? "English" : "中文"}</p>
          </div>
          <span className="rounded-full border border-gray-200 px-3 py-0.5 text-xs text-gray-500">
            {lang === "en" ? "中文" : "EN"}
          </span>
        </button>

        <button
          onClick={() => router.push("/")}
          className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors hover:bg-red-50"
        >
          <LogOut size={20} className="text-red-400" />
          <span className="text-sm font-semibold text-red-500">{t.logout[lang]}</span>
        </button>
      </div>
    </div>
  );
}
