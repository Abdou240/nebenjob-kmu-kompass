import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/app";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${base}/calculators/stundenlohn`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${base}/calculators/nebenverdienst`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${base}/calculators/kleinunternehmer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
