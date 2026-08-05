import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-10">
      <EmptyState
        icon={UtensilsCrossed}
        title="Dish not found"
        description="This item may have been removed from the menu. Explore what else we're serving."
        action={
          <Button variant="gold" size="lg" asChild>
            <Link href="/menu">Back to Menu</Link>
          </Button>
        }
      />
    </div>
  );
}
