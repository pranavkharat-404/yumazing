import { Skeleton } from "@/components/ui/skeleton";

export function FoodCardSkeleton() {
  return (
    <div className="w-full space-y-3 rounded-3xl bg-white p-3 shadow-card">
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function FoodGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryScrollSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex shrink-0 flex-col items-center gap-2">
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}
