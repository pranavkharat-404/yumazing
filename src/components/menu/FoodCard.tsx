"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, Sparkles } from "lucide-react";
import type { MenuItem } from "@/types";
import { VegBadge } from "@/components/shared/VegBadge";
import { PriceTag } from "@/components/shared/PriceTag";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useGatedAction } from "@/hooks/useGatedAction";
import { cn } from "@/lib/utils";

export function FoodCard({ item, className }: { item: MenuItem; className?: string }) {
  const { addItem, incrementItem, decrementItem, getQuantity } = useCart();
  const runGated = useGatedAction();
  const quantity = getQuantity(item.id);

  const handleAdd = () => runGated(() => addItem(item));
  const handleInc = () => runGated(() => incrementItem(item.id));
  const handleDec = () => decrementItem(item.id);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-card",
        className
      )}
    >
      <Link href={`/food/${item.id}`} className="relative block h-32 w-full overflow-hidden bg-cream-200 sm:h-36">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {item.isTodaysSpecial && (
            <Badge variant="default" className="shadow-sm">
              <Sparkles className="h-2.5 w-2.5" /> Special
            </Badge>
          )}
        </div>
        <div className="absolute right-2 top-2">
          <VegBadge />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/food/${item.id}`}>
          <h3 className="line-clamp-2 font-display text-sm font-semibold text-forest-900">{item.name}</h3>
        </Link>

        <div className="mt-auto flex items-center justify-between pt-1">
          <PriceTag amount={item.price} />

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="flex h-9 items-center gap-1 rounded-full border-2 border-forest-700 bg-cream-50 px-4 text-xs font-bold text-forest-700 transition active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          ) : (
            <div className="flex h-9 items-center gap-3 rounded-full bg-forest-700 px-2 text-cream-50">
              <button onClick={handleDec} aria-label="Decrease quantity" className="active:scale-90">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[1ch] text-center text-xs font-bold">{quantity}</span>
              <button onClick={handleInc} aria-label="Increase quantity" className="active:scale-90">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}