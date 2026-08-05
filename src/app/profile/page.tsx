"use client";

import { motion } from "framer-motion";
import { LogOut, Phone, User as UserIcon, ShieldCheck, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { CAFE } from "@/lib/constants";
import { buildWhatsAppChatUrl } from "@/lib/whatsapp";

export default function ProfilePage() {
  const { user, profile, loading, openLogin, logout } = useAuth();

  if (loading) {
    return <div className="px-4 pt-8 text-center text-sm text-forest-400">Loading profile…</div>;
  }

  if (!user) {
    return (
      <div className="animate-fade-up pt-6">
        <EmptyState
          icon={UserIcon}
          title="You're not logged in"
          description="Log in with your phone number to view your profile and track orders."
          action={
            <Button variant="gold" size="lg" onClick={() => openLogin()}>
              Login Now
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-up px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-forest-gradient p-6 text-cream-50 shadow-soft"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-display text-2xl font-bold text-forest-900">
            {(profile?.name ?? "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-display text-lg font-bold">{profile?.name ?? "Customer"}</p>
            <p className="flex items-center gap-1.5 text-sm text-cream-200/80">
              <Phone className="h-3.5 w-3.5" /> {profile?.phone}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1.5 text-xs font-semibold w-fit">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-300" /> Verified customer
        </div>
      </motion.div>

      <div className="mt-6 space-y-3">
        <a
          href={buildWhatsAppChatUrl("Hi Yumazing, I have a question about my order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
        >
          <span className="flex items-center gap-3 text-sm font-semibold text-forest-800">
            <MessageCircle className="h-5 w-5 text-forest-600" /> Chat with us on WhatsApp
          </span>
        </a>
        <a
          href={CAFE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
        >
          <span className="flex items-center gap-3 text-sm font-semibold text-forest-800">
            <Instagram className="h-5 w-5 text-forest-600" /> Follow us on Instagram
          </span>
        </a>
      </div>

      <button
        onClick={() => logout()}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-red-100 bg-red-50 py-4 text-sm font-bold text-red-500"
      >
        <LogOut className="h-4.5 w-4.5" /> Logout
      </button>
    </div>
  );
}
