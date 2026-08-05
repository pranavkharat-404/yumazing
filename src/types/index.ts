export type CategorySlug =
  | "starters-snacks"
  | "burgers-sandwiches"
  | "pizzas"
  | "coffee"
  | "mocktail"
  | "dessert";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  isVeg: true;
  description: string;
  image: string;
  isBestSeller?: boolean;
  isPopular?: boolean;
  isTodaysSpecial?: boolean;
  tags?: string[];
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

export interface CustomerProfile {
  uid: string;
  name: string;
  phone: string;
  createdAt: number;
}

export type SortOption = "default" | "price-asc" | "price-desc";
