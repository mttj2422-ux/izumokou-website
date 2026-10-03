"use client";

import Link from "next/link";
import { useState } from "react";
import PackageBox from "./PackageBox";
import SmokeEffect from "./SmokeEffect";
import { formatPrice, fragrances } from "@/data/fragrances";
import { productBasics, site } from "@/data/site";

/**
 * SCENE 07 — 香りを迎える。
 * 商品一覧ではなく、七つの箱が並ぶ静かな棚。選んだ香りに香煙が立ち、
 * 購入ボタン（オンラインストアへ）ははっきりと示す。
 */
export default function ProductSection() {
  const [index, setIndex] = useState(0);
  const f = fragrances[index];
  const price = formatPrice(f.price);
  const storeUrl = f.storeUrl ?? site.storeUrl;

  return (
    <section id="product" className="product" aria-labelledby="product-title">
      <div className="product__head">
        <p className="eyebrow" data-reveal lang="en">
          Online Store
        </p>
        <h2 id="product-title" className="product__title" data-reveal>
          香りを、迎える。
        </h2>
      </div>

      <div className="product__layout">
        <div className="product__stage" style={{ "--c": f.color } as React.CSSProperties}>
          <div className="product__glow" aria-hidden="true" />
          <div className="product__shelf">
            {fragrances.map((p, i) => (
              <div key={p.slug} className={`product__slot ${i === index ? "is-active" : ""}`}>
                {i === index && <SmokeEffect className="product__smoke" />}
                <PackageBox fragrance={p} sizes="(min-width: 1024px) 160px, 100px" />
              </div>
            ))}
          </div>
        </div>

        <div className="product__info">
          <div className="product__picker" role="group" aria-label="香りを選ぶ">
            {fragrances.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                className="product__pick"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="product__detail" aria-live="polite">
            <p className="product__name" key={f.slug}>
              {f.name}
            </p>
            <p className="product__note">
              <span lang="en">{f.noteEn}</span>
              <span>{f.note}</span>
            </p>
            <dl className="product__spec">
              <div>
                <dt>種類</dt>
                <dd>{productBasics.type}</dd>
              </div>
              <div>
                <dt>燃焼時間</dt>
                <dd>{productBasics.burnTime}</dd>
              </div>
              <div>
                <dt>価格</dt>
                <dd>{price ?? "オンラインストアにてご確認ください"}</dd>
              </div>
            </dl>
          </div>

          <div className="product__actions">
            <a href={storeUrl} target="_blank" rel="noopener" className="btn btn--solid">
              オンラインストアへ
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only">（{f.name}・新しいタブで開きます）</span>
            </a>
            <Link href={`/fragrances/${f.slug}`} className="btn btn--line">
              この香りを詳しく見る
            </Link>
          </div>
          <p className="product__store-note">ご購入は、出雲香のオンラインストア（BASE）にてお受けしています。</p>
        </div>
      </div>
    </section>
  );
}
