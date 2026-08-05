"use client";

import * as React from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import type { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/shared/PriceTag";
import { useCart } from "@/context/CartContext";
import { useGatedAction } from "@/hooks/useGatedAction";

export function FoodDetailActions({ item }: { item: MenuItem }) {
  const { addItem, getQuantity, incrementItem, decrementItem, openCart } = useCart();
  const runGated = useGatedAction();
  const [localQty, setLocalQty] = React.useState(1);
  const cartQty = getQuantity(item.id);

  if (cartQty > 0) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-14 items-center gap-4 rounded-full bg-forest-700 px-5 text-cream-50">
          <button onClick={() => decrementItem(item.id)} aria-label="Decrease" className="active:scale-90">
            <Minus className="h-4.5 w-4.5" />
          </button>
          <span className="min-w-[1.5ch] text-center font-bold">{cartQty}</span>
          <button onClick={() => incrementItem(item.id)} aria-label="Increase" className="active:scale-90">
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
        <Button variant="gold" size="lg" className="flex-1" onClick={openCart}>
          <MessageCircle className="h-4.5 w-4.5" /> Go to Cart
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-14 items-center gap-4 rounded-full border-2 border-forest-100 bg-white px-5">
        <button
          onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease"
          className="text-forest-700 active:scale-90"
        >
          <Minus className="h-4.5 w-4.5" />
        </button>
        <span className="min-w-[1.5ch] text-center font-bold text-forest-800">{localQty}</span>
        <button
          onClick={() => setLocalQty((q) => q + 1)}
          aria-label="Increase"
          className="text-forest-700 active:scale-90"
        >
          <Plus className="h-4.5 w-4.5" />
        </button>
      </div>
      <Button
        variant="gold"
        size="lg"
        className="flex-1"
        onClick={() => runGated(() => addItem(item, localQty))}
      >
        Add to Cart · <PriceTag amount={item.price * localQty} className="text-forest-900" />
      </Button>
    </div>
  );
}
