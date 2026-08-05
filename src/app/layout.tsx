import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { StickyCartButton } from "@/components/cart/StickyCartButton";
import { CAFE } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(CAFE.siteUrl),
  title: {
    default: `${CAFE.name} | Order Online`,
    template: `%s | ${CAFE.name}`,
  },
  description: `${CAFE.tagline} — Order starters, burgers, pizzas, coffee, mocktails and desserts online from ${CAFE.name}, Mehkar.`,
  applicationName: CAFE.name,
  manifest: "/manifest.json",
  openGraph: {
    title: `${CAFE.name} | Order Online`,
    description: CAFE.tagline,
    url: CAFE.siteUrl,
    siteName: CAFE.name,
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: CAFE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CAFE.name} | Order Online`,
    description: CAFE.tagline,
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#123527",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <Providers>
          <TopAppBar />
          <main className="mx-auto max-w-lg pb-28">{children}</main>
          <StickyCartButton />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
