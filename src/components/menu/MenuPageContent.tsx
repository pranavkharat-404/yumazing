"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { SearchBar } from "@/components/menu/SearchBar";
import { CategoryChips } from "@/components/menu/CategoryChips";
import { FilterSheet } from "@/components/menu/FilterSheet";
import { FoodCard } from "@/components/menu/FoodCard";
import { FoodGridSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilteredMenu } from "@/hooks/useMenu";
import type { CategorySlug, SortOption } from "@/types";

export function MenuPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as CategorySlug | null) ?? "all";

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<CategorySlug | "all">(initialCategory);
  const [vegOnly, setVegOnly] = React.useState(false);
  const [sort, setSort] = React.useState<SortOption>("default");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const debouncedQuery = useDebounce(query, 250);
  const items = useFilteredMenu({ query: debouncedQuery, category, vegOnly, sort });

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const activeFilterCount = (vegOnly ? 1 : 0) + (sort !== "default" ? 1 : 0);

  return (
    <div className="animate-fade-up pt-4">
      <div className="px-4">
        <h1 className="font-display text-2xl font-bold text-forest-900">Full Menu</h1>
        <p className="mt-1 text-sm text-forest-400">{items.length} dishes to explore</p>
      </div>

      <div className="mt-4 flex items-center gap-2 px-4">
        <SearchBar value={query} onChange={setQuery} className="flex-1" />
        <button
          onClick={() => setFilterOpen(true)}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-forest-100 bg-white text-forest-700 shadow-card"
          aria-label="Filters"
        >
          <SlidersHorizontal className="h-5 w-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-forest-900">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mt-4">
        <CategoryChips value={category} onChange={setCategory} />
      </div>

      <div className="mt-5 px-4">
        {loading ? (
          <FoodGridSkeleton count={8} />
        ) : items.length === 0 ? (
          <EmptyState
            title="No dishes found"
            description="Try a different search term or clear your filters."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
        sort={sort}
        onSortChange={setSort}
      />
    </div>
  );
}
