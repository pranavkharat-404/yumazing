import { cn } from "@/lib/utils";

export function VegBadge({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";
  const dot = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <div
      className={cn("flex items-center justify-center rounded-[3px] border-2 border-veg bg-white", box, className)}
      style={size === "md" ? { height: "18px", width: "18px" } : undefined}
      aria-label="Vegetarian"
      title="100% Vegetarian"
    >
      <span className={cn("rounded-full bg-veg", dot)} />
    </div>
  );
}
