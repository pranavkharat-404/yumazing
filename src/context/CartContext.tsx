"use client";

import * as React from "react";
import type { CartLine, MenuItem } from "@/types";

const STORAGE_KEY = "yumazing.cart.v1";

interface CartContextValue {
  lines: CartLine[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem, quantity?: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getQuantity: (itemId: string) => number;
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const hydrated = React.useRef(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLines(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to hydrate cart", err);
    } finally {
      hydrated.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = React.useCallback((item: MenuItem, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { item, quantity }];
    });
  }, []);

  const incrementItem = React.useCallback((itemId: string) => {
    setLines((prev) =>
      prev.map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity + 1 } : l))
    );
  }, []);

  const decrementItem = React.useCallback((itemId: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.item.id === itemId ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const removeItem = React.useCallback((itemId: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== itemId));
  }, []);

  const clearCart = React.useCallback(() => setLines([]), []);

  const getQuantity = React.useCallback(
    (itemId: string) => lines.find((l) => l.item.id === itemId)?.quantity ?? 0,
    [lines]
  );

  const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0);

  const value: CartContextValue = {
    lines,
    totalItems,
    subtotal,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
