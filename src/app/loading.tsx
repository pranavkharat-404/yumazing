import { FoodGridSkeleton, CategoryScrollSkeleton } from "@/components/shared/Skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 px-4 pt-4">
      <Skeleton className="h-48 w-full rounded-4xl" />
      <CategoryScrollSkeleton />
      <FoodGridSkeleton />
    </div>
  );
}
