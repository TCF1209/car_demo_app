"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useApp } from "@/lib/context";
import { motion } from "framer-motion";

export default function TopNav() {
  const { lang, toggleLang, totalItems } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-display font-bold text-sm">
            A
          </div>
          <span className="font-display font-bold text-lg text-gray-900">
            AutoCare<span className="text-primary">Pro</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>

          <Link href="/cart" className="relative p-1">
            <ShoppingCart size={22} className="text-gray-700" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
