"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/cart", label: "Cart", icon: ShoppingBag },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-100 bg-cream-50/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg items-center justify-between px-6 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          const isCart = href === "/cart";

          const content = (
            <div className="relative flex flex-col items-center gap-1 py-1.5">
              <Icon
                className={cn("h-5.5 w-5.5 transition-colors", isActive ? "text-forest-800" : "text-forest-300")}
                strokeWidth={isActive ? 2.4 : 2}
              />
              {isCart && totalItems > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-bold text-forest-900">
                  {totalItems}
                </span>
              )}
              <span className={cn("text-[10px] font-semibold", isActive ? "text-forest-800" : "text-forest-300")}>
                {label}
              </span>
              {isActive && <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-gold-400" />}
            </div>
          );

          if (isCart) {
            return (
              <button key={href} onClick={openCart} className="flex-1">
                {content}
              </button>
            );
          }

          return (
            <Link key={href} href={href} className="flex-1">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
