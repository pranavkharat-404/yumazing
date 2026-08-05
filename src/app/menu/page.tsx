import { Suspense } from "react";
import type { Metadata } from "next";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { FoodGridSkeleton } from "@/components/shared/Skeletons";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse the full Yumazing Multi Food Corner menu — starters, burgers, pizzas, coffee, mocktails and desserts.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="px-4 pt-4"><FoodGridSkeleton count={8} /></div>}>
      <MenuPageContent />
    </Suspense>
  );
}
