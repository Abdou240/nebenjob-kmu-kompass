import type { Metadata } from "next";
import { siteConfig } from "@/config/app";

const titleSuffix = " | Nebenjob & Kleinunternehmer Helfer";

export function buildMetadata({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title.endsWith(titleSuffix) ? title : `${title}${titleSuffix}`;
  const url = path ? `${siteConfig.baseUrl}${path}` : siteConfig.baseUrl;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website"
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description
    }
  };
}
