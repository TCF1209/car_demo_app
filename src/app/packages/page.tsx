"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ShoppingCart } from "lucide-react";
import { getIcon } from "@/lib/icons";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { servicePackages } from "@/data/mock";
import { formatPrice } from "@/lib/utils";

export default function PackagesPage() {
  const { lang, addPackageToCart, cartPackages } = useApp();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (pkg: typeof servicePackages[0]) => {
    addPackageToCart(pkg);
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="font-display text-xl font-bold text-gray-900">
          {t.packagesTitle[lang]}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {t.packagesSubtitle[lang]}
        </p>
      </motion.div>

      {/* Package Cards */}
      <div className="space-y-4">
        {servicePackages.map((pkg, i) => {
          const IconComp = getIcon(pkg.icon);
          const savings = pkg.originalPrice - pkg.price;
          const badge =
            pkg.id === "pkg2" ? t.mostPopular : pkg.id === "pkg3" ? t.bestValue : null;
          const inCart = cartPackages.some((p) => p.id === pkg.id);
          const justAdded = addedId === pkg.id;

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="relative overflow-hidden rounded-2xl bg-white shadow-md"
            >
              {/* Badge */}
              {badge && (
                <div className="absolute right-3 top-3 z-10 rounded-full px-3 py-0.5" style={{ background: pkg.color }}>
                  <span className="text-[10px] font-bold text-white">
                    {badge[lang]}
                  </span>
                </div>
              )}

              {/* Gradient Header */}
              <div className="px-5 py-4" style={{ background: pkg.color }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                    <IconComp size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {pkg.name[lang]}
                    </h3>
                    <p className="text-xs text-white/80">{pkg.description[lang]}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Pricing */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-gray-900">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(pkg.originalPrice)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                    {t.saveAmount[lang]} {formatPrice(savings)}
                  </span>
                  <span className="flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-600">
                    <Sparkles size={10} />
                    +{pkg.bonusPoints} {t.bonusPoints[lang]}
                  </span>
                </div>

                {/* Includes */}
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t.whatsIncluded[lang]}
                  </p>
                  <div className="space-y-1.5">
                    {pkg.includes.map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check size={14} className="flex-shrink-0 text-green-500" />
                        <span className="text-sm text-gray-700">
                          {item.name[lang]}
                        </span>
                        <span className="text-xs text-gray-400">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add to Cart / In Cart Button */}
                <button
                  onClick={() => !inCart && handleAdd(pkg)}
                  disabled={inCart}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-transform active:scale-[0.98] ${
                    inCart
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "text-white shadow-md"
                  }`}
                  style={!inCart ? { background: pkg.color } : undefined}
                >
                  <AnimatePresence mode="wait">
                    {justAdded ? (
                      <motion.span
                        key="added"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        <Check size={16} /> {t.addedToCart[lang]}
                      </motion.span>
                    ) : inCart ? (
                      <motion.span key="incart" className="flex items-center gap-1">
                        <Check size={16} /> {t.inCart[lang]}
                      </motion.span>
                    ) : (
                      <motion.span key="add" className="flex items-center gap-1">
                        <ShoppingCart size={16} /> {t.addToCart[lang]} — {formatPrice(pkg.price)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Worth info */}
      <p className="mt-4 text-center text-xs text-gray-400">
        {t.worthUp[lang]} {formatPrice(servicePackages[2].originalPrice)}
      </p>
    </div>
  );
}
