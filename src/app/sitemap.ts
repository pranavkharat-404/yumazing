import type { MetadataRoute } from "next";
import { getAllMenuItems } from "@/hooks/useMenu";
import { CAFE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/menu", "/profile"].map((path) => ({
    url: `${CAFE.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const foodRoutes: MetadataRoute.Sitemap = getAllMenuItems().map((item) => ({
    url: `${CAFE.siteUrl}/food/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...foodRoutes];
}
