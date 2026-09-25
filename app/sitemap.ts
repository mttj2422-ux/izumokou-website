import type { MetadataRoute } from "next";
import { fragrances } from "@/data/fragrances";
import { site } from "@/data/site";

// ビルド時に一度だけ生成（静的書き出しにも対応）
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...fragrances.map((f) => ({
      url: `${site.url}/fragrances/${f.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
