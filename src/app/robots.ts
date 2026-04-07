import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`
  };
}
