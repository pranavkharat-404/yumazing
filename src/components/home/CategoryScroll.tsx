"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getAllCategories } from "@/hooks/useMenu";

export function CategoryScroll() {
  const categories = getAllCategories();

  return (
    <section className="mt-8">
      <h2 className="px-4 font-display text-xl font-semibold text-forest-900">Categories</h2>
      <div className="mt-3 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat, i) => {
          const Icon = (Icons[cat.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Utensils;
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={`/menu?category=${cat.slug}`}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card transition-transform active:scale-95">
                  <Icon className="h-7 w-7 text-forest-700" strokeWidth={1.75} />
                </div>
                <span className="max-w-[72px] text-center text-[11px] font-semibold leading-tight text-forest-700">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
