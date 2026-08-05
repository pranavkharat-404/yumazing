import type { MenuItem } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FoodCard } from "@/components/menu/FoodCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface FoodCarouselSectionProps {
  eyebrow?: string;
  title: string;
  items: MenuItem[];
  href?: string;
}

export function FoodCarouselSection({ eyebrow, title, items, href }: FoodCarouselSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-9">
      <SectionHeading eyebrow={eyebrow} title={title} href={href} />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} className="w-[46vw] shrink-0 sm:w-56" />
        ))}
      </div>
    </section>
  );
}
