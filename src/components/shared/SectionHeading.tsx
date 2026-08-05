import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  href?: string;
}

export function SectionHeading({ eyebrow, title, href }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-end justify-between px-4">
      <div>
        {eyebrow && (
          <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-gold-500">{eyebrow}</p>
        )}
        <h2 className="font-display text-xl font-semibold text-forest-900">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-0.5 text-sm font-semibold text-forest-600 hover:text-gold-500"
        >
          See all
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
