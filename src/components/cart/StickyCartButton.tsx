"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export function StickyCartButton() {
  const { totalItems, subtotal, openCart } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed inset-x-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40"
        >
          <button
            onClick={openCart}
            className="mx-auto flex w-full max-w-lg items-center justify-between rounded-full bg-forest-800 px-5 py-3.5 text-cream-50 shadow-soft active:scale-[0.98]"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-forest-900">
                <ShoppingBag className="h-3.5 w-3.5" />
              </span>
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold">
              {formatINR(subtotal)}
              <span className="text-gold-300">View Cart →</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
