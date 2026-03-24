"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { products } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { ProductCategory } from "@/types";

type Filter = "all" | ProductCategory;

export default function ProductsPage() {
  const { lang, addItem } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter(
      (p) =>
        p.name[lang].toLowerCase().includes(search.toLowerCase()) ||
        p.description[lang].toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="px-4 py-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t.searchProducts[lang]}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-secondary py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex gap-2">
        {(["all", "parts", "services"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? t.all[lang] : f === "parts" ? t.parts[lang] : t.services[lang]}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => {
          const IconComp = getIcon(product.icon);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className="flex flex-col rounded-2xl bg-secondary p-3"
            >
              <div className="mb-2 flex h-28 items-center justify-center rounded-xl bg-gray-200/60">
                <IconComp size={36} className="text-gray-400" />
              </div>
              <span className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">
                {product.name[lang]}
              </span>
              <p className="mt-0.5 text-[10px] text-gray-400 line-clamp-2 leading-tight">
                {product.description[lang]}
              </p>
              <span className="mt-1.5 text-sm font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-amber-600">
                ⭐ {t.earnPoints[lang]} {Math.floor(product.price)} {t.pts[lang]}
              </span>
              <button
                onClick={() => addItem(product)}
                className="mt-2 rounded-lg bg-primary py-2 text-xs font-semibold text-white transition-all hover:bg-primary/90 active:scale-95"
              >
                {t.addToCart[lang]}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
