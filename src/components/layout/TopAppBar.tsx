"use client";

import * as React from "react";
import Link from "next/link";
import { Search, MapPin, Bell } from "lucide-react";

export function TopAppBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-forest-100/60 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-forest-gradient font-display text-lg font-bold text-gold-200 shadow-card">
            Y
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold text-forest-900">Yumazing</p>
            <p className="flex items-center gap-0.5 text-[11px] text-forest-400">
              <MapPin className="h-3 w-3" /> Mehkar
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            aria-label="Search food"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-forest-700 transition hover:bg-cream-300"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>
          <button
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-forest-700 transition hover:bg-cream-300"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
