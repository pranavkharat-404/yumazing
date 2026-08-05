import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { FoodCarouselSection } from "@/components/home/FoodCarouselSection";
import { Footer } from "@/components/layout/Footer";
import { getTodaysSpecials, getPopularItems, getBestSellers } from "@/hooks/useMenu";

export default function HomePage() {
  const specials = getTodaysSpecials();
  const popular = getPopularItems();
  const bestSellers = getBestSellers();

  return (
    <div className="animate-fade-up">
      <HeroBanner />
      <CategoryScroll />

      <FoodCarouselSection
        eyebrow="Chef's Pick"
        title="Today's Special"
        items={specials}
        href="/menu"
      />

      <FoodCarouselSection
        eyebrow="Loved by regulars"
        title="Popular Items"
        items={popular}
        href="/menu"
      />

      <FoodCarouselSection
        eyebrow="Top rated"
        title="Best Sellers"
        items={bestSellers}
        href="/menu"
      />

      <div className="mt-9 px-4">
        <a
          href="/menu"
          className="flex items-center justify-center rounded-3xl border-2 border-dashed border-forest-200 bg-white py-6 text-center font-display text-base font-semibold text-forest-700 shadow-card transition hover:border-gold-400 hover:text-gold-500"
        >
          View Full Menu →
        </a>
      </div>

      <Footer />
    </div>
  );
}
