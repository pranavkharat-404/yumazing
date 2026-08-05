"use client";

import { useAuth } from "@/context/AuthContext";

export function useGatedAction() {
  const { user, openLogin } = useAuth();

  return function runGated(action: () => void) {
    if (user) {
      action();
    } else {
      openLogin(() => action());
    }
  };
}
