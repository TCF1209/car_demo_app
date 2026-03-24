"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Star, User } from "lucide-react";
import { useApp } from "@/lib/context";
import { t } from "@/data/translations";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: t.home },
  { href: "/products", icon: ShoppingBag, label: t.products },
  { href: "/points", icon: Star, label: t.points },
  { href: "/profile", icon: User, label: t.profile },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { lang } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
                active
                  ? "text-primary font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label[lang]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
