"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { CAFE } from "@/lib/constants";
import { buildWhatsAppChatUrl } from "@/lib/whatsapp";

export function HeroBanner() {
  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-4xl bg-forest-gradient px-6 pb-8 pt-10 text-cream-50 shadow-soft">
      <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full border-[10px] border-gold-400/20" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full border-[10px] border-gold-400/10" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient font-display text-2xl font-bold text-forest-900 shadow-gold">
          Y
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-cream-50">
          {CAFE.name}
        </h1>
        <p className="mt-1.5 text-sm font-medium text-gold-200">{CAFE.tagline}</p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-cream-200/80">
          <MapPin className="h-3.5 w-3.5 text-gold-300" />
          <span>{CAFE.addressLines.join(" ")}</span>
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-3">
          <a
            href={`tel:${CAFE.phone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cream-50/10 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-cream-50/20"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={buildWhatsAppChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-gradient py-3 text-sm font-bold text-forest-900 shadow-gold transition hover:brightness-105"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={CAFE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 backdrop-blur-sm transition hover:bg-cream-50/20"
          >
            <Instagram className="h-4.5 w-4.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
