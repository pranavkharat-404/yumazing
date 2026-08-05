"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Sheet, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { PriceTag } from "@/components/shared/PriceTag";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useGatedAction } from "@/hooks/useGatedAction";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatINR } from "@/lib/utils";
import { NO_DELIVERY_CHARGE_NOTE } from "@/lib/constants";

export function CartSheet() {
  const { isCartOpen, closeCart, lines, subtotal, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const { profile } = useAuth();
  const runGated = useGatedAction();

  const handleCheckout = () => {
    runGated(() => {
      const name = profile?.name ?? "Customer";
      const phone = profile?.phone ?? "";
      const url = buildWhatsAppOrderUrl({ customerName: name, customerPhone: phone, lines });
      window.open(url, "_blank", "noopener,noreferrer");
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Your Cart</SheetTitle>
          {lines.length > 0 && (
            <button onClick={clearCart} className="text-xs font-semibold text-forest-400 hover:text-red-500">
              Clear all
            </button>
          )}
        </div>
      </SheetHeader>

      <SheetBody>
        {lines.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet. Go on, treat yourself."
          />
        ) : (
          <div className="space-y-3">
            {lines.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-display text-sm font-semibold text-forest-900">{item.name}</p>
                  <PriceTag amount={item.price} className="text-xs" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-forest-300 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 rounded-full bg-cream-200 px-1.5 py-1">
                    <button onClick={() => decrementItem(item.id)} className="active:scale-90" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5 text-forest-600" />
                    </button>
                    <span className="min-w-[1ch] text-center text-xs font-bold text-forest-800">{quantity}</span>
                    <button onClick={() => incrementItem(item.id)} className="active:scale-90" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5 text-forest-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetBody>

      {lines.length > 0 && (
        <SheetFooter>
          <div className="mb-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-forest-500">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between font-display text-base font-bold text-forest-900">
              <span>Total</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <p className="text-[11px] text-forest-400">{NO_DELIVERY_CHARGE_NOTE}</p>
          </div>
          <Button variant="gold" size="lg" className="w-full" onClick={handleCheckout}>
            <MessageCircle className="h-5 w-5" /> Checkout on WhatsApp
          </Button>
        </SheetFooter>
      )}
    </Sheet>
  );
}
