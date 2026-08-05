import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-forest-700 text-cream-50",
        gold: "bg-gold-gradient text-forest-900",
        veg: "border border-veg text-veg bg-white",
        outline: "border border-forest-200 text-forest-600 bg-transparent",
        cream: "bg-cream-200 text-forest-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
