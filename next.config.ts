import type { NextConfig } from "next";
import { legacyRedirects } from "./data/redirects";

/**
 * 公開方法を固定しないための設定。
 * - 通常：Node.js / Vercel / Netlify / Cloudflare など、Next.js が動くホスティング向け
 * - STATIC_EXPORT=1：HTML を書き出して、静的ホスティング（格安・無料枠）に置く場合
 *   （画像の自動最適化とリダイレクト設定は使えないため、ホスティング側で代替する）
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  ...(staticExport
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async redirects() {
          return legacyRedirects.map((r) => ({ ...r, permanent: true }));
        },
      }),
};

export default nextConfig;
