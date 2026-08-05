import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, Flame, Sparkles } from "lucide-react";
import { getAllMenuItems, getMenuItemById } from "@/hooks/useMenu";
import { VegBadge } from "@/components/shared/VegBadge";
import { Badge } from "@/components/ui/badge";
import { FoodDetailActions } from "@/components/menu/FoodDetailActions";
import { slugToTitle } from "@/lib/utils";

interface FoodPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllMenuItems().map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: FoodPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getMenuItemById(id);
  if (!item) return { title: "Item not found" };
  return {
    title: item.name,
    description: item.description,
    openGraph: { images: [{ url: item.image }] },
  };
}

export default async function FoodDetailPage({ params }: FoodPageProps) {
  const { id } = await params;
  const item = getMenuItemById(id);

  if (!item) notFound();

  return (
    <div className="animate-fade-up pb-6">
      <div className="relative h-72 w-full sm:h-80">
        <Image src={item.image} alt={item.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-forest-900/20" />
        <Link
          href="/menu"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 text-forest-800 shadow-card backdrop-blur-sm"
          aria-label="Back to menu"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="absolute right-4 top-4">
          <VegBadge />
        </div>
      </div>

      <div className="relative -mt-6 rounded-t-4xl bg-cream-50 px-5 pt-6">
        <div className="flex flex-wrap gap-2">
          {item.isBestSeller && (
            <Badge variant="gold">
              <Flame className="h-2.5 w-2.5" /> Best Seller
            </Badge>
          )}
          {item.isTodaysSpecial && (
            <Badge variant="default">
              <Sparkles className="h-2.5 w-2.5" /> Today's Special
            </Badge>
          )}
          <Badge variant="outline">{slugToTitle(item.category)}</Badge>
        </div>

        <h1 className="mt-3 font-display text-2xl font-bold text-forest-900">{item.name}</h1>
        <p className="mt-2 text-sm leading-relaxed text-forest-500">{item.description}</p>

        <div className="mt-6">
          <FoodDetailActions item={item} />
        </div>
      </div>
    </div>
  );
}
