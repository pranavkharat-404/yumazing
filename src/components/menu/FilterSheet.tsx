"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal, Leaf, ArrowUpNarrowWide, ArrowDownWideNarrow, RotateCcw } from "lucide-react";
import { Sheet, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { SortOption } from "@/types";
import { cn } from "@/lib/utils";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vegOnly: boolean;
  onVegOnlyChange: (value: boolean) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function FilterSheet({ open, onOpenChange, vegOnly, onVegOnlyChange, sort, onSortChange }: FilterSheetProps) {
  const sortOptions: { value: SortOption; label: string; icon: ReactNode }[] = [
    { value: "default", label: "Recommended", icon: <SlidersHorizontal className="h-4 w-4" /> },
    { value: "price-asc", label: "Price: Low to High", icon: <ArrowUpNarrowWide className="h-4 w-4" /> },
    { value: "price-desc", label: "Price: High to Low", icon: <ArrowDownWideNarrow className="h-4 w-4" /> },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>
      <SheetBody>
        <button
          onClick={() => onVegOnlyChange(!vegOnly)}
          className="flex w-full items-center justify-between rounded-2xl bg-cream-100 p-4"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-forest-800">
            <Leaf className="h-4.5 w-4.5 text-veg" /> Veg Only
          </span>
          <span
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              vegOnly ? "bg-veg" : "bg-forest-100"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                vegOnly ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </span>
        </button>

        <p className="mb-2 mt-6 text-xs font-bold uppercase tracking-wide text-forest-400">Sort by</p>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-sm font-semibold transition-colors",
                sort === opt.value
                  ? "border-forest-700 bg-forest-50 text-forest-800"
                  : "border-forest-100 bg-white text-forest-500"
              )}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </SheetBody>
      <SheetFooter>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onVegOnlyChange(false);
              onSortChange("default");
            }}
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button variant="gold" className="flex-1" onClick={() => onOpenChange(false)}>
            Apply
          </Button>
        </div>
      </SheetFooter>
    </Sheet>
  );
}
