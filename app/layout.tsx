import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Shippori_Mincho } from "next/font/google";
import { isProductionSite, site } from "@/data/site";
import "./globals.css";

const mincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mincho",
});

const serif = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.nameEn}｜${site.tagline}`,
    template: `%s｜${site.name} ${site.nameEn}`,
  },
  description: site.description,
  applicationName: `${site.name} ${site.nameEn}`,
  keywords: ["出雲香", "IZUMOKOU", "お香", "出雲 お香", "島根 お香", "稲佐の浜", "出雲 ギフト", "香り ギフト"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: `${site.name} ${site.nameEn}`,
    title: `${site.name} ${site.nameEn}｜${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.nameEn}｜${site.tagline}`,
    description: site.description,
  },
  formatDetection: { telephone: false },
  // 仮 URL で確認している間は検索エンジンに載せない（SITE_ENV=production で解除）
  robots: isProductionSite ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${mincho.variable} ${serif.variable}`}>
      <head>
        {/* JS が有効な場合のみ「静かな出現」のための初期非表示を有効にする */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
