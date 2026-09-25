import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageBox from "@/components/PackageBox";
import SmokeEffect from "@/components/SmokeEffect";
import ScrollDirector from "@/components/ScrollDirector";
import JsonLd from "@/components/JsonLd";
import { formatPrice, fragrances, getFragrance, romanNumerals } from "@/data/fragrances";
import { cautions, howToUse, productBasics, site } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return fragrances.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFragrance(slug);
  if (!f) return {};
  const title = `${f.name}｜${f.note}`;
  const description = `出雲香「${f.name}」— ${f.note}（${f.noteEn}）の香り。出雲・稲佐の浜の海水を用いてつくられたスティックタイプのお香。燃焼時間${productBasics.burnTime}。`;
  return {
    title,
    description,
    alternates: { canonical: `/fragrances/${f.slug}` },
    openGraph: { title: `出雲香 ${title}`, description, url: `/fragrances/${f.slug}`, type: "website" },
    twitter: { title: `出雲香 ${title}`, description },
  };
}

export default async function FragrancePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const f = getFragrance(slug);
  if (!f) notFound();

  const i = fragrances.indexOf(f);
  const prev = fragrances[(i + fragrances.length - 1) % fragrances.length];
  const next = fragrances[(i + 1) % fragrances.length];
  const price = formatPrice(f.price);
  const storeUrl = f.storeUrl ?? site.storeUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `出雲香 ${f.name}`,
    description: `${f.note}（${f.noteEn}）の香り。${productBasics.type}。燃焼時間${productBasics.burnTime}。`,
    brand: { "@type": "Brand", name: `${site.name} ${site.nameEn}` },
    url: `${site.url}/fragrances/${f.slug}`,
    ...(f.image ? { image: `${site.url}${f.image.src}` } : {}),
    ...(f.price != null
      ? {
          offers: {
            "@type": "Offer",
            price: f.price,
            priceCurrency: "JPY",
            url: storeUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "出雲香", item: site.url },
      { "@type": "ListItem", position: 2, name: "七つの香り", item: `${site.url}/#fragrance` },
      { "@type": "ListItem", position: 3, name: f.name, item: `${site.url}/fragrances/${f.slug}` },
    ],
  };

  return (
    <>
      <Header />
      <main id="main" className="detail" style={{ "--c": f.color } as React.CSSProperties}>
        <section className="detail__hero" aria-labelledby="detail-title">
          <div className="detail__light" aria-hidden="true" />
          <SmokeEffect className="detail__smoke" />
          <nav aria-label="パンくずリスト" className="detail__crumbs">
            <ol>
              <li>
                <Link href="/">出雲香</Link>
              </li>
              <li>
                <Link href="/#fragrance">七つの香り</Link>
              </li>
              <li aria-current="page">{f.name}</li>
            </ol>
          </nav>
          <p className="detail__num" aria-hidden="true">
            {romanNumerals[f.order - 1]} <span>/ VII</span>
          </p>
          <h1 id="detail-title" className={`detail__name ${f.name.length > 1 ? "is-long" : ""}`}>
            {f.name}
          </h1>
          <p className="detail__note">
            <span lang="en">{f.noteEn}</span>
            <span>{f.note}</span>
          </p>
          <p className="detail__copy" data-reveal>
            {f.copy}
          </p>
        </section>

        <section className="detail__product" aria-labelledby="detail-product-title">
          <div className="detail__visual">
            {f.image ? (
              <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" />
            ) : (
              <PackageBox fragrance={f} className="detail__package" />
            )}
          </div>

          <div className="detail__info">
            <h2 id="detail-product-title" className="detail__heading" data-reveal>
              出雲香 {f.name}
            </h2>
            <dl className="product__spec detail__spec" data-reveal>
              <div>
                <dt>香調</dt>
                <dd>{f.note}</dd>
              </div>
              <div>
                <dt>種類</dt>
                <dd>{productBasics.type}</dd>
              </div>
              <div>
                <dt>燃焼時間</dt>
                <dd>{productBasics.burnTime}</dd>
              </div>
              <div>
                <dt>香りを焚く時間</dt>
                <dd>{f.moment}</dd>
              </div>
              <div>
                <dt>価格</dt>
                <dd>{price ?? "オンラインストアにてご確認ください"}</dd>
              </div>
            </dl>
            <div className="product__actions detail__actions" data-reveal>
              <a href={storeUrl} target="_blank" rel="noopener" className="btn btn--solid">
                この香りを迎える（オンラインストアへ）
                <span className="btn__arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </div>
            <p className="product__store-note">ご購入は、出雲香のオンラインストア（BASE）にてお受けしています。</p>
          </div>
        </section>

        <section className="detail__howto" aria-labelledby="howto-title">
          <h2 id="howto-title" className="detail__heading" data-reveal>
            香りの焚き方
          </h2>
          <ol className="detail__steps" data-reveal>
            {howToUse.map((s, n) => (
              <li key={s}>
                <span className="detail__step-num" aria-hidden="true">
                  {romanNumerals[n]}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <ul className="detail__cautions" data-reveal>
            {cautions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <nav className="detail__pager" aria-label="ほかの香り">
          <Link href={`/fragrances/${prev.slug}`} className="detail__pager-link">
            <span className="detail__pager-label">前の香り</span>
            <span className="detail__pager-name">{prev.name}</span>
          </Link>
          <Link href="/#finder" className="link-line">
            今の想いから選ぶ
          </Link>
          <Link href={`/fragrances/${next.slug}`} className="detail__pager-link detail__pager-link--next">
            <span className="detail__pager-label">次の香り</span>
            <span className="detail__pager-name">{next.name}</span>
          </Link>
        </nav>
      </main>
      <Footer />
      <ScrollDirector />
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />
    </>
  );
}
