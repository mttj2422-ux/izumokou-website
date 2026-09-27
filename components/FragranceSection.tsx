"use client";

import { useEffect, useRef } from "react";
import FragranceCard from "./FragranceCard";
import { fragrances, romanNumerals } from "@/data/fragrances";

/**
 * SCENE 03 — 七つの香り。
 * PC：画面を固定し、スクロールに合わせて横へ一章ずつ進む。
 * スマホ／動きを減らす設定：縦に一章ずつ世界が切り替わる。
 */
export default function FragranceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // 横スクロール中、キーボードで画面外の章へフォーカスが移ったら、その章までスクロールする
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pinned = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const onFocus = (e: FocusEvent) => {
      if (!pinned.matches) return;
      const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
      if (!panel) return;
      const i = Number(panel.dataset.panel);
      section.querySelector<HTMLElement>(".fragrances__pin")?.scrollTo({ left: 0 });
      const top = section.getBoundingClientRect().top + window.scrollY + i * window.innerHeight;
      window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    };
    section.addEventListener("focusin", onFocus);
    return () => section.removeEventListener("focusin", onFocus);
  }, []);

  return (
    <section
      id="fragrance"
      ref={sectionRef}
      className="fragrances"
      data-sticky
      aria-labelledby="fragrance-title"
      style={{ "--panels": fragrances.length + 1 } as React.CSSProperties}
    >
      <div className="fragrances__pin">
        <div className="fragrances__track">
          <div className="fragrances__intro" data-panel={0}>
            <p className="eyebrow" data-reveal lang="en">
              Seven Fragrances
            </p>
            <h2 id="fragrance-title" className="fragrances__title" data-reveal>
              七つの香り
            </h2>
            <ul className="fragrances__names" aria-label="七つの香りの名前">
              {fragrances.map((f, i) => (
                <li
                  key={f.slug}
                  className="fragrances__name"
                  data-reveal
                  style={{ "--c": f.color, "--d": `${0.3 + i * 0.12}s` } as React.CSSProperties}
                >
                  <span className="fragrances__name-num" aria-hidden="true">
                    {romanNumerals[i]}
                  </span>
                  <span className="fragrances__name-text">{f.name}</span>
                </li>
              ))}
            </ul>
            <p className="fragrances__lead" data-reveal>
              七つの言葉が、
              <br className="sp-only" />
              七つの香りになりました。
            </p>
            <p className="fragrances__hint" aria-hidden="true">
              <span />
            </p>
          </div>
          {fragrances.map((f, i) => (
            <div className="fragrances__panel" data-panel={i + 1} key={f.slug}>
              <FragranceCard fragrance={f} index={i} />
            </div>
          ))}
        </div>
        <div className="fragrances__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
