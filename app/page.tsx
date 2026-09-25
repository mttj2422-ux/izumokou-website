import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InasaSection from "@/components/InasaSection";
import MythSection from "@/components/MythSection";
import FragranceSection from "@/components/FragranceSection";
import ScentFinder from "@/components/ScentFinder";
import BrandStory from "@/components/BrandStory";
import SeawaterSection from "@/components/SeawaterSection";
import ProductSection from "@/components/ProductSection";
import LastScene from "@/components/LastScene";
import Footer from "@/components/Footer";
import ScrollDirector from "@/components/ScrollDirector";
import JsonLd from "@/components/JsonLd";
import { fragrances } from "@/data/fragrances";
import { site } from "@/data/site";

/**
 * 一本の物語としてのトップページ。
 * 夜明けの浜 → 朝の海 → 神話の暗がり → 七つの香り → 香りとの出会い
 * → 生まれた理由 → 海から香りへ → 香りを迎える → 夕暮れの浜
 */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: `${site.name} ${site.nameEn}`,
        alternateName: [site.name, site.nameEn],
        url: site.url,
        slogan: site.tagline,
        ...(site.instagramUrl ? { sameAs: [site.instagramUrl] } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} ${site.nameEn}`,
        inLanguage: "ja",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "ItemList",
        name: "出雲香 七つの香り",
        itemListElement: fragrances.map((f) => ({
          "@type": "ListItem",
          position: f.order,
          url: `${site.url}/fragrances/${f.slug}`,
          name: `出雲香 ${f.name}（${f.note}）`,
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <InasaSection />
        <MythSection />
        <FragranceSection />
        <ScentFinder />
        <BrandStory />
        <SeawaterSection />
        <ProductSection />
        <LastScene />
      </main>
      <Footer />
      <ScrollDirector />
      <JsonLd data={jsonLd} />
    </>
  );
}
