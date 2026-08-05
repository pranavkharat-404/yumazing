export const CAFE = {
  name: "Yumazing Multi Food Corner",
  tagline: "Good Food • Good Mood • Great Memories",
  addressLines: ["Yumazing Multi Food Corner,", "DP Road, Ram Nagar,", "Mehkar"],
  phone: process.env.NEXT_PUBLIC_CAFE_PHONE || "+918378929230",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918378929230",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/yumazing",
  openingHours: "11:00 AM – 11:00 PM, All Days",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yumazing.vercel.app",
} as const;

export const NO_DELIVERY_CHARGE_NOTE = "No delivery charges — pickup / dine-in pricing";
