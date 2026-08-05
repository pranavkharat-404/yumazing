import { MapPin, Phone, Instagram, Clock } from "lucide-react";
import { CAFE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-10 rounded-t-4xl bg-forest-gradient px-6 pb-28 pt-10 text-cream-100">
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <p className="font-display text-xl font-bold text-cream-50">{CAFE.name}</p>
          <p className="mt-1 text-sm text-gold-200">{CAFE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-300" />
            <p className="text-cream-200/90">
              {CAFE.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <a href={`tel:${CAFE.phone}`} className="flex items-center gap-3 hover:text-gold-200">
            <Phone className="h-4.5 w-4.5 shrink-0 text-gold-300" />
            <span className="text-cream-200/90">{CAFE.phone}</span>
          </a>
          <a
            href={CAFE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-gold-200"
          >
            <Instagram className="h-4.5 w-4.5 shrink-0 text-gold-300" />
            <span className="text-cream-200/90">@yumazing</span>
          </a>
          <div className="flex items-center gap-3">
            <Clock className="h-4.5 w-4.5 shrink-0 text-gold-300" />
            <span className="text-cream-200/90">{CAFE.openingHours}</span>
          </div>
        </div>

        <div className="border-t border-cream-50/10 pt-4 text-xs text-cream-200/60">
          © {new Date().getFullYear()} {CAFE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
