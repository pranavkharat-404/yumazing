"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Sheet, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth, type AuthMode } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function LoginModal() {
  const { isLoginOpen, closeLogin, signup, login, authError, clearAuthError, submitting } = useAuth();

  const [mode, setMode] = React.useState<AuthMode>("signup");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (!isLoginOpen) {
      setName("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    }
  }, [isLoginOpen]);

  const switchMode = (next: AuthMode) => {
    clearAuthError();
    setPassword("");
    setConfirmPassword("");
    setMode(next);
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = phoneDigits.length === 10;
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = mode === "login" || password === confirmPassword;

  const canSubmit =
    !submitting &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmValid &&
    (mode === "login" || isNameValid);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      if (mode === "signup") {
        await signup({ name: name.trim(), phone: phoneDigits, password });
      } else {
        await login({ phone: phoneDigits, password });
      }
    } catch {
    }
  };

  return (
    <Sheet open={isLoginOpen} onOpenChange={(open) => !open && closeLogin()}>
      <SheetHeader>
        <SheetTitle>{mode === "signup" ? "Create your account" : "Welcome back"}</SheetTitle>
      </SheetHeader>

      <SheetBody>
        <div className="mb-5 flex rounded-full bg-cream-200 p-1">
          <button
            onClick={() => switchMode("signup")}
            className={cn(
              "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
              mode === "signup" ? "bg-forest-700 text-cream-50 shadow-card" : "text-forest-500"
            )}
          >
            Sign Up
          </button>
          <button
            onClick={() => switchMode("login")}
            className={cn(
              "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
              mode === "login" ? "bg-forest-700 text-cream-50 shadow-card" : "text-forest-500"
            )}
          >
            Log In
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    className="pl-11"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">
                Phone number
              </label>
              <div className="relative flex items-center">
                <Phone className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-medium text-forest-400">
                  +91
                </span>
                <Input
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter Your Phone No"
                  className="pl-[4.5rem]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-300 hover:text-forest-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide text-forest-400">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="pl-11"
                  />
                </div>
                {confirmPassword.length > 0 && confirmPassword !== password && (
                  <p className="text-xs font-medium text-red-500">Passwords don't match.</p>
                )}
              </div>
            )}

            {authError && <p className="text-sm font-medium text-red-500">{authError}</p>}
          </motion.div>
        </AnimatePresence>

        <p className="mt-5 text-center text-xs text-forest-400">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")} className="font-semibold text-forest-700 underline-offset-2 hover:underline">
                Log in
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button onClick={() => switchMode("signup")} className="font-semibold text-forest-700 underline-offset-2 hover:underline">
                Create an account
              </button>
            </>
          )}
        </p>
      </SheetBody>

      <SheetFooter>
        <Button variant="gold" size="lg" className="w-full" disabled={!canSubmit} onClick={handleSubmit}>
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : mode === "signup" ? (
            "Create account"
          ) : (
            "Log in"
          )}
        </Button>
      </SheetFooter>
    </Sheet>
  );
}
