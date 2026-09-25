import type { MetadataRoute } from "next";
import { isProductionSite, site } from "@/data/site";

// ビルド時に一度だけ生成（静的書き出しにも対応）
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // 仮 URL・プレビューではクロール自体を止める（SITE_ENV=production で公開）
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
