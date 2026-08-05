"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({ value, onChange, className, placeholder = "Search for dishes..." }: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-300" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-forest-100 bg-white pl-11 pr-10 text-sm text-forest-900 placeholder:text-forest-300 outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-forest-300 hover:bg-cream-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
