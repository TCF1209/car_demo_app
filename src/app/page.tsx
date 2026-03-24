"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Star, Car, ChevronRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { products } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { ProductCategory } from "@/types";

const features = [
  { icon: Wrench, title: t.qualityParts, desc: t.qualityPartsDesc },
  { icon: Star, title: t.loyaltyRewards, desc: t.loyaltyRewardsDesc },
  { icon: Car, title: t.fullService, desc: t.fullServiceDesc },
];

type Filter = "all" | ProductCategory;

export default function HomePage() {
  const { lang, addItem } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/5 to-primary/10 px-5 py-10 text-center"
      >
        <h1 className="font-display text-2xl font-bold text-gray-900 leading-tight">
          {t.heroTitle[lang]}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{t.heroSubtitle[lang]}</p>
        <Link
          href="/products"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-transform active:scale-95"
        >
          {t.browseServices[lang]}
          <ChevronRight size={16} />
        </Link>
      </motion.section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-3 gap-3 px-5 py-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="flex flex-col items-center rounded-2xl bg-secondary p-4 text-center"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Icon size={20} className="text-primary" />
            </div>
            <span className="text-xs font-semibold text-gray-800">{title[lang]}</span>
            <span className="mt-0.5 text-[10px] text-gray-400 leading-tight">{desc[lang]}</span>
          </motion.div>
        ))}
      </section>

      {/* Category Tabs */}
      <section className="px-5">
        <div className="flex gap-2">
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
      </section>

      {/* Featured Products */}
      <section className="px-5 pb-6 pt-4">
        <h2 className="mb-3 font-display text-lg font-bold text-gray-900">
          {t.featuredProducts[lang]}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {filtered.map((product, i) => {
            const IconComp = getIcon(product.icon);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="flex w-40 flex-shrink-0 flex-col rounded-2xl bg-secondary p-3"
              >
                <div className="mb-2 flex h-24 items-center justify-center rounded-xl bg-gray-200/60">
                  <IconComp size={32} className="text-gray-400" />
                </div>
                <span className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {product.name[lang]}
                </span>
                <span className="mt-1 text-sm font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => addItem(product)}
                  className="mt-2 rounded-lg bg-primary/10 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 active:scale-95"
                >
                  {t.addToCart[lang]}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
