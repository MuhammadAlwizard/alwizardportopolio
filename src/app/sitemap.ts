import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://alwizardportopolio.vercel.app/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
