"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { CartSheet } from "@/components/cart/CartSheet";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <LoginModal />
        <CartSheet />
      </CartProvider>
    </AuthProvider>
  );
}
