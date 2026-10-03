"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { wishes } from "@/data/finder";
import { getFragrance } from "@/data/fragrances";
import { site } from "@/data/site";

/**
 * SCENE 04 — 香りとの出会い。
 * 想いを一つ選ぶと、霧の奥から香りが静かに現れる。
 * 占い・効能の断定はせず、「香りを選ぶ楽しさ」として設計。
 */
export default function ScentFinder() {
  const [wishId, setWishId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const wish = wishes.find((w) => w.id === wishId) ?? null;
  const fragrance = wish ? getFragrance(wish.fragranceSlug) : undefined;

  const choose = (id: string) => {
    setWishId(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 1023px)").matches;
    if (small) {
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }),
      );
    }
  };

  const reset = () => {
    setWishId(null);
    listRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };

  return (
    <section
      id="finder"
      className={`finder ${fragrance ? "has-result" : ""}`}
      style={fragrance ? ({ "--c": fragrance.color } as React.CSSProperties) : undefined}
      aria-labelledby="finder-title"
    >
      <div className="finder__light" aria-hidden="true" />
      <div className="finder__inner">
        <div className="finder__ask">
          <p className="eyebrow" data-reveal lang="en">
            Find your fragrance
          </p>
          <h2 id="finder-title" className="finder__title" data-reveal>
            今、何を
            <br />
            想いますか？
          </h2>
          <ul ref={listRef} className="finder__wishes" aria-label="想いを選ぶ" data-reveal>
            {wishes.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  className="finder__wish"
                  aria-pressed={w.id === wishId}
                  onClick={() => choose(w.id)}
                >
                  {w.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div ref={resultRef} className="finder__result" aria-live="polite">
          {wish && fragrance ? (
            <div className="finder__reveal" key={wish.id}>
              <p className="finder__lead">今のあなたに寄り添う香りは——</p>
              <p className="finder__name">{fragrance.name}</p>
              <p className="finder__note">
                <span lang="en">{fragrance.noteEn}</span>
                <span>{fragrance.note}</span>
              </p>
              <p className="finder__deity">
                <span className="finder__deity-label">宿る神様</span>
                <span className="finder__deity-name">{fragrance.deity.name}</span>
                <span className="finder__deity-theme">{fragrance.deity.theme}</span>
              </p>
              <p className="finder__message">{fragrance.deity.story}</p>
              <div className="finder__actions">
                <Link href={`/fragrances/${fragrance.slug}`} className="link-line">
                  この香りを詳しく見る
                </Link>
                <a
                  href={fragrance.storeUrl ?? site.storeUrl}
                  target="_blank"
                  rel="noopener"
                  className="link-line link-line--muted"
                >
                  オンラインストアへ<span className="sr-only">（新しいタブで開きます）</span>
                </a>
              </div>
              <button type="button" className="finder__again" onClick={reset}>
                もう一度選ぶ
              </button>
            </div>
          ) : (
            <p className="finder__placeholder" aria-hidden="true">
              <span />
            </p>
          )}
        </div>
      </div>
      <p className="finder__disclaimer">
        迷ったら「今の気分」や「過ごしたい時間」で選んでみてください。
        <br />
        出雲香は、香りを選ぶことそのものが、あなた自身を大切にする時間です。
      </p>
    </section>
  );
}
