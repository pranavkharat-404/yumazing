import type { LucideIcon } from "lucide-react";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon = PackageSearch, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 px-6 py-16 text-center", className)}>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cream-200">
        <Icon className="h-11 w-11 text-forest-400" strokeWidth={1.5} />
      </div>
      <div className="space-y-1.5">
        <p className="font-display text-lg font-semibold text-forest-900">{title}</p>
        {description && <p className="max-w-xs text-sm text-forest-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
