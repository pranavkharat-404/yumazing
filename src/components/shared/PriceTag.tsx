import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PriceTag({ amount, className }: { amount: number; className?: string }) {
  return <span className={cn("font-display font-semibold text-forest-800", className)}>{formatINR(amount)}</span>;
}
