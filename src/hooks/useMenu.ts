import { useMemo } from "react";
import menuData from "@/data/menu.json";
import categoriesData from "@/data/categories.json";
import type { Category, CategorySlug, MenuItem, SortOption } from "@/types";

const MENU: MenuItem[] = menuData as MenuItem[];
const CATEGORIES: Category[] = categoriesData as Category[];

export function getAllMenuItems(): MenuItem[] {
  return MENU;
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}

export function getItemsByCategory(slug: CategorySlug): MenuItem[] {
  return MENU.filter((item) => item.category === slug);
}

export function getBestSellers(): MenuItem[] {
  return MENU.filter((item) => item.isBestSeller);
}

export function getPopularItems(): MenuItem[] {
  return MENU.filter((item) => item.isPopular);
}

export function getTodaysSpecials(): MenuItem[] {
  return MENU.filter((item) => item.isTodaysSpecial);
}

interface UseFilteredMenuOptions {
  query?: string;
  category?: CategorySlug | "all";
  vegOnly?: boolean;
  sort?: SortOption;
}

export function useFilteredMenu({ query = "", category = "all", vegOnly = false, sort = "default" }: UseFilteredMenuOptions) {
  return useMemo(() => {
    let items = [...MENU];

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    if (vegOnly) {
      items = items.filter((item) => item.isVeg);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [query, category, vegOnly, sort]);
}
