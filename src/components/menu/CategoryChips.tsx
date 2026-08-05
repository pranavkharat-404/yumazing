"use client";

import type { CategorySlug } from "@/types";
import { getAllCategories } from "@/hooks/useMenu";
import { cn } from "@/lib/utils";

interface CategoryChipsProps {
  value: CategorySlug | "all";
  onChange: (value: CategorySlug | "all") => void;
}

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  const categories = getAllCategories();

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        onClick={() => onChange("all")}
        className={cn(
          "shrink-0 rounded-full border-2 px-4 py-2 text-xs font-bold transition-colors",
          value === "all"
            ? "border-forest-700 bg-forest-700 text-cream-50"
            : "border-forest-100 bg-white text-forest-600"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            "shrink-0 rounded-full border-2 px-4 py-2 text-xs font-bold transition-colors",
            value === cat.slug
              ? "border-forest-700 bg-forest-700 text-cream-50"
              : "border-forest-100 bg-white text-forest-600"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
